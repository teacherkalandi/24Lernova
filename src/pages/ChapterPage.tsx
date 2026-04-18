import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play, FileText, CheckCircle, Download, ChevronRight, Search } from 'lucide-react';

export default function SubjectPage() {
  const { id, subjectId } = useParams();

  const chapters = [
    { id: '1', title: 'Introduction to the Subject', duration: '15:20', status: 'completed' },
    { id: '2', title: 'Fundamental Concepts & Principles', duration: '24:45', status: 'in-progress' },
    { id: '3', title: 'Advanced Applications', duration: '18:10', status: 'locked' },
    { id: '4', title: 'Practical Implementation', duration: '22:30', status: 'locked' },
    { id: '5', title: 'Case Studies & Real World Examples', duration: '30:15', status: 'locked' },
    { id: '6', title: 'Summary & Review', duration: '12:00', status: 'locked' },
  ];

  const subjectName = subjectId?.charAt(0).toUpperCase() + subjectId?.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Subject Header */}
      <div className="bg-indigo-600 pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to={`/class/${id}`} className="inline-flex items-center gap-2 text-indigo-100 hover:text-white font-semibold mb-8 transition-colors">
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
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                <Download size={20} />
                Download Syllabus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search chapters..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
              Filter
            </button>
            <button className="px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Course Content</h2>
            
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/class/${id}/subject/${subjectId}/chapter/${chapter.id}`}
                  className={`group flex items-center justify-between p-6 rounded-2xl border transition-all ${
                    chapter.status === 'locked' 
                      ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                      chapter.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                      chapter.status === 'in-progress' ? 'bg-indigo-100 text-indigo-600' :
                      'bg-slate-200 text-slate-400'
                    }`}>
                      {chapter.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                        {chapter.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Play size={12} />
                          {chapter.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText size={12} />
                          Notes Available
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {chapter.status === 'completed' && <CheckCircle className="text-emerald-500" size={24} />}
                    {chapter.status !== 'locked' && <ChevronRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" size={24} />}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Course Progress</h3>
              <div className="mb-6">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-500">2 of 6 Chapters</span>
                  <span className="text-indigo-600">33%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '33%' }} />
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Complete all chapters to unlock the final subject assessment and earn your certificate.
              </p>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25">
                Continue Learning
              </button>
            </div>

            <div className="bg-emerald-500 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Subject Quiz</h3>
              <p className="text-emerald-50 mb-6 text-sm">
                Ready to test your knowledge? Take the {subjectName} mock test.
              </p>
              <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold text-sm">
                Start Mock Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
