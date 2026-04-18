import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Book, ArrowLeft, ChevronRight, GraduationCap, Loader2, Star, Target, Bookmark } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { SUBJECTS_LIST } from '../constants';

export default function ClassPage() {
  const { id } = useParams();
  const [subjectCounts, setSubjectCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'resources'),
          where('classLevel', '==', id?.toLowerCase())
        );
        const querySnapshot = await getDocs(q);
        const counts: Record<string, number> = {};
        
        querySnapshot.docs.forEach(doc => {
          const sub = doc.data().subject.toLowerCase();
          counts[sub] = (counts[sub] || 0) + 1;
        });

        setSubjectCounts(counts);
      } catch (error) {
        console.error("Error fetching subject counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [id]);

  const displaySubjects = SUBJECTS_LIST.map(sub => ({
    ...sub,
    count: subjectCounts[sub.id] || 0,
    desc: `Comprehensive resources, practice papers, and chapter notes for ${sub.name}.`
  }));

  const isCompetitive = isNaN(Number(id));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="bg-brand-red pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full -mr-64 -mt-64 blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent rounded-full -ml-64 -mb-64 blur-3xl opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-red-100 hover:text-white font-black uppercase text-xs tracking-widest mb-8 transition-all hover:-translate-x-1">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-brand-red shadow-2xl relative"
            >
              {isCompetitive ? <Target size={48} /> : <GraduationCap size={48} />}
              <div className="absolute -bottom-2 -right-2 bg-brand-accent w-10 h-10 rounded-full flex items-center justify-center text-brand-red shadow-lg border-4 border-white">
                <Star size={20} fill="currentColor" />
              </div>
            </motion.div>
            <div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight uppercase"
              >
                {isCompetitive ? id?.toUpperCase() : `Class ${id}`} <span className="text-brand-accent">Hub</span>
              </motion.h1>
              <p className="text-red-100 text-lg font-medium max-w-2xl opacity-90">
                {isCompetitive 
                  ? `Master your ${id?.toUpperCase()} preparation with curated subjects, mock tests, and expert materials.`
                  : `Dedicated learning path for Class ${id} students with curated study materials for every subject.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-12 relative z-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-200 dark:border-slate-800">
            <Loader2 className="animate-spin text-brand-red mb-6" size={48} />
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Building your library...</p>
          </div>
        ) : displaySubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displaySubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/class/${id}/subject/${subject.id}`}
                  className="group block bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 hover:border-brand-red transition-all shadow-lg hover:shadow-2xl relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${subject.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-bl-full`} />
                  
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                      {subject.icon}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-brand-red group-hover:bg-red-50 transition-all transform group-hover:rotate-45">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">{subject.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                    {subject.desc}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-black text-[10px] uppercase tracking-widest shadow-lg ${subject.color}`}>
                      <Bookmark size={14} />
                      <span>{subject.count} Modules</span>
                    </div>
                    {subject.count > 0 && (
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Updated
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-inner">
            <div className="bg-slate-50 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <Book className="text-slate-300" size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase">Library Empty</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">
              We haven't uploaded any resources for {isCompetitive ? id?.toUpperCase() : `Class ${id}`} yet. Use the Internal Portal to add subjects.
            </p>
          </div>
        )}
      </div>
      
      {/* Help Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-64 h-64 bg-brand-red/10 rounded-full -ml-32 -mt-32 blur-3xl" />
           <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">Accessing <span className="text-brand-accent">Study Tools?</span></h2>
              <p className="text-slate-400 font-medium">All students get free access to calculators, periodic tables, and more.</p>
           </div>
           <button className="relative z-10 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand-accent transition-all">
              Go to Resource Box
           </button>
        </div>
      </div>
    </div>
  );
}
