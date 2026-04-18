import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Book, ArrowLeft, ChevronRight, GraduationCap, Loader2 } from 'lucide-react';
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
    desc: `Resources and curriculum materials for ${sub.name}.`
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-slate-50 border-b border-slate-200 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-red font-semibold mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 bg-brand-red rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-brand-red/20">
              <GraduationCap size={40} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                Class {id} <span className="text-brand-red">Curriculum</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Explore subjects and study materials specifically designed for Class {id} students.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-red mb-4" size={40} />
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Subjects...</p>
          </div>
        ) : displaySubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displaySubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/class/${id}/subject/${subject.id}`}
                  className="group block bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-brand-red transition-all shadow-sm hover:shadow-xl overflow-hidden"
                >
                  <div className={`h-2 ${subject.color}`} />
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-4xl">{subject.icon}</div>
                      <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-brand-red group-hover:bg-red-50 transition-all">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{subject.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      {subject.desc}
                    </p>
                    <div className="flex items-center gap-2 text-brand-red font-bold text-sm">
                      <Book size={16} />
                      <span>{subject.count} Resources Available</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Book className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No Subjects Available</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Please use the Internal Portal to upload resources for Class {id} to see subjects here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
