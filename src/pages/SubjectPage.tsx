import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play, FileText, CheckCircle, Download, ChevronRight, Search, Loader2, FolderOpen } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

import { SUBJECTS_LIST } from '../constants';

export default function SubjectPage() {
  const { id, subjectId } = useParams();
  const [chapters, setChapters] = useState<{ id: string, title: string, resourceCount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'resources'),
          where('classLevel', '==', id?.toLowerCase()),
          where('subject', '==', subjectId || ''),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const chapterMap = new Map<string, number>();
        
        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          const name = data.chapterName;
          chapterMap.set(name, (chapterMap.get(name) || 0) + 1);
        });

        const chapterList = Array.from(chapterMap.entries()).map(([title, count]) => ({
          id: title, // We will use title as ID
          title: title,
          resourceCount: count
        }));

        setChapters(chapterList);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [id, subjectId]);

  const subjectInfo = SUBJECTS_LIST.find(s => s.id === subjectId?.toLowerCase()) || { name: subjectId, icon: '📖' };
  const subjectName = subjectInfo.name;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Subject Header */}
      <div className="bg-brand-red pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to={`/class/${id}`} className="inline-flex items-center gap-2 text-red-100 hover:text-white font-semibold mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Class {id}
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-widest">
                  Class {id}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-widest">
                  {subjectName}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight text-shadow-lg">
                {subjectName}
              </h1>
            </div>
            
            <div className="flex gap-4">
              <button className="bg-white text-brand-red px-6 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                <Download size={20} />
                Download Syllabus
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search chapters..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-red transition-all text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">Chapter Folders</h2>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
                <Loader2 className="animate-spin" size={40} />
                <p className="font-bold uppercase text-xs tracking-widest">Exploring Chapters...</p>
              </div>
            ) : chapters.length > 0 ? (
              chapters.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/class/${id}/subject/${subjectId}/chapter/${encodeURIComponent(chapter.title)}`}
                    className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-brand-red hover:shadow-2xl transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-brand-accent/20 rounded-2xl flex items-center justify-center text-brand-red font-black group-hover:bg-brand-red group-hover:text-white transition-all transform group-hover:rotate-6 shadow-inner">
                        <FolderOpen size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-brand-red transition-colors uppercase tracking-tight">
                          {chapter.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-2">
                            <FileText size={12} className="text-brand-red" />
                            {chapter.resourceCount} {chapter.resourceCount === 1 ? 'Resource' : 'Resources'}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                          <span className="text-emerald-500 font-black">Open Access</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-brand-red group-hover:text-white transition-all">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="bg-white dark:bg-slate-900 p-16 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 text-center shadow-inner">
                <FolderOpen className="mx-auto text-slate-200 mb-6" size={64} />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">No Chapters Found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">
                  We haven't uploaded any resources for this subject yet. Please check back later.
                </p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
               <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Course Data</h3>
               <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                       <span>Content Volume</span>
                       <span className="text-brand-red">{chapters.reduce((acc, c) => acc + c.resourceCount, 0)} Files</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        className="h-full bg-brand-red rounded-full" 
                       />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
