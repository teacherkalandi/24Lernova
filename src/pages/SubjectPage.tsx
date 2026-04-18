import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play, FileText, CheckCircle, Download, ChevronRight, Search, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

import { SUBJECTS_LIST } from '../constants';

export default function SubjectPage() {
  const { id, subjectId } = useParams();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'resources'),
          where('classLevel', '==', id?.toLowerCase()),
          where('subject', '==', subjectId || ''),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
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
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
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

      {/* Chapters List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Course Content</h2>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {resources.length} Chapters Found
              </div>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
                <Loader2 className="animate-spin" size={40} />
                <p className="font-bold uppercase text-xs tracking-widest">Loading Resources...</p>
              </div>
            ) : resources.length > 0 ? (
              resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-6 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-red hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg bg-red-100 text-brand-red">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-brand-red transition-colors">
                          {resource.chapterName}
                        </h3>
                        <div className="flex flex-col mt-1 space-y-1">
                          <p className="text-xs font-medium text-slate-500 line-clamp-1">{resource.instruction}</p>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1">
                              <FileText size={10} />
                              Resource Available
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-brand-red p-2 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg translate-x-4 group-hover:translate-x-0">
                        <Play size={16} />
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-brand-red group-hover:translate-x-1 transition-all" size={24} />
                    </div>
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
                <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="text-slate-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 underline decoration-brand-red underline-offset-4">No Resources Found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  We haven't uploaded any resources for this subject yet. Please check back later or use the Internal Portal to add some.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
