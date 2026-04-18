import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Play, 
  FileText, 
  Download, 
  ChevronRight, 
  ChevronLeft,
  MessageSquare,
  Send,
  CheckCircle2,
  XCircle,
  Trophy,
  ExternalLink,
  Loader2,
  FileBox
} from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function ChapterDetail() {
  const { id, subjectId, chapterId } = useParams();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'resources' | 'quiz'>('resources');
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const decodedChapterName = decodeURIComponent(chapterId || '');

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'resources'),
          where('classLevel', '==', id),
          where('subject', '==', subjectId),
          where('chapterName', '==', decodedChapterName)
        );
        
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setResources(docs);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [id, subjectId, decodedChapterName]);

  const quizQuestions = [
    {
      question: "What is the primary focus of this chapter?",
      options: ["Basic Principles", "Advanced Applications", "Historical Context", "Future Trends"],
      correct: 0
    },
    {
      question: "Which of the following is a key concept discussed in the video?",
      options: ["Thermodynamics", "Quantum States", "Fundamental Laws", "System Analysis"],
      correct: 2
    }
  ];

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
      setSelectedOption(null);
    } else {
      setQuizScore(85); // Mock score
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navigation Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to={`/class/${id}/subject/${subjectId}`} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-red transition-colors">
              <ArrowLeft size={16} />
              Back to Chapters
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chapter Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-red uppercase tracking-widest mb-2">
                <span>Subject: {subjectId}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>Resources Available</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {decodedChapterName}
              </h1>
            </div>

            {/* Content Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
              {[
                { id: 'resources', label: 'Study Resources', icon: FileBox },
                { id: 'quiz', label: 'Practice Quiz', icon: Trophy },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
                    activeTab === tab.id 
                      ? 'text-brand-red' 
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-1 bg-brand-red rounded-t-full" 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'resources' && (
                  <motion.div
                    key="resources"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
                        <Loader2 className="animate-spin" size={40} />
                        <p className="font-bold uppercase tracking-widest text-xs">Fetching materials...</p>
                      </div>
                    ) : resources.length > 0 ? (
                      resources.map((res, i) => (
                         <div key={res.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                               <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-4">
                                     <span className="bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Resource {i + 1}
                                     </span>
                                  </div>
                                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-6">
                                     {res.instruction}
                                  </p>
                                  <a 
                                    href={res.link} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-brand-red font-black uppercase text-xs tracking-widest hover:underline"
                                  >
                                    Open Resource <ExternalLink size={14} />
                                  </a>
                               </div>
                               <div className="w-full md:w-32 aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300">
                                  {res.link.includes('youtube') || res.link.includes('youtu.be') ? (
                                    <Play size={40} className="text-brand-red/40" />
                                  ) : (
                                    <FileText size={40} className="text-brand-red/40" />
                                  )}
                               </div>
                            </div>
                         </div>
                      ))
                    ) : (
                      <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                        <FileBox className="mx-auto text-slate-200 mb-4" size={48} />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Files Found</h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto">
                           No resources have been linked to this chapter yet.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'quiz' && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
                  >
                    {quizScore === null ? (
                      <div className="space-y-8">
                        <div className="flex justify-between items-center">
                          <h2 className="text-2xl font-bold">Practice Quiz</h2>
                          <span className="text-sm font-bold text-slate-400">Question {quizStep + 1} of {quizQuestions.length}</span>
                        </div>
                        
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                          <div 
                            className="h-full bg-brand-red rounded-full transition-all duration-500" 
                            style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} 
                          />
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {quizQuestions[quizStep].question}
                          </h3>
                          <div className="grid grid-cols-1 gap-4">
                            {quizQuestions[quizStep].options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedOption(idx)}
                                className={`p-5 rounded-2xl text-left font-bold transition-all border ${
                                  selectedOption === idx 
                                    ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/25' 
                                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-red'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between pt-8">
                          <button 
                            disabled={quizStep === 0}
                            onClick={() => setQuizStep(quizStep - 1)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 disabled:opacity-30"
                          >
                            <ChevronLeft size={20} />
                            Previous
                          </button>
                          <button 
                            onClick={handleQuizSubmit}
                            className="bg-brand-red text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-brand-red/25 flex items-center gap-2"
                          >
                            {quizStep === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 space-y-6">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                          <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-3xl font-black">Quiz Completed!</h2>
                        <p className="text-slate-500">Great job! You've successfully completed the practice quiz for this chapter.</p>
                        <div className="text-5xl font-black text-brand-red">{quizScore}%</div>
                        <div className="flex justify-center gap-4 pt-8">
                          <button 
                            onClick={() => { setQuizScore(null); setQuizStep(0); }}
                            className="px-8 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-400"
                          >
                            Retake Quiz
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full -mr-12 -mt-12" />
              <h3 className="text-xl font-bold mb-4 relative z-10">Study Group</h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">
                Join 1,200+ other students studying this subject.
              </p>
              <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm relative z-10">
                Join Telegram Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
