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
  FileBox,
  FileSpreadsheet,
  File as LucideFile,
  MonitorPlay
} from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

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
          where('chapterName', '==', decodedChapterName),
          orderBy('createdAt', 'desc')
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

  const getFileIcon = (type: string, link: string) => {
    const isVideo = link.includes('youtube') || link.includes('youtu.be');
    if (isVideo) return <MonitorPlay className="text-brand-red" size={32} />;
    
    switch (type) {
      case 'pdf': return <FileText className="text-rose-500" size={32} />;
      case 'doc':
      case 'docx': return <FileText className="text-blue-500" size={32} />;
      case 'xls':
      case 'xlsx':
      case 'csv': return <FileSpreadsheet className="text-emerald-500" size={32} />;
      default: return <LucideFile className="text-slate-400" size={32} />;
    }
  };

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
                <span className="capitalize">{subjectId} Hub</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>Chapter Library</span>
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
                         <motion.div 
                          key={res.id} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-brand-red transition-all"
                         >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                               <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-4">
                                     <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-colors">
                                        Resource {i + 1}
                                     </span>
                                     {res.fileType && res.fileType !== 'url' && (
                                       <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                          {res.fileType} File
                                       </span>
                                     )}
                                  </div>
                                  <h4 className="text-xl font-black text-slate-800 dark:text-white mb-3 uppercase tracking-tight">
                                     {res.fileName || "Study Material"}
                                  </h4>
                                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6 text-sm">
                                     {res.instruction}
                                  </p>
                                  <div className="flex items-center gap-4">
                                    <a 
                                      href={res.link} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-2 bg-brand-red text-white pr-4 py-2 pl-2 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-800 transition-all shadow-lg shadow-brand-red/10"
                                    >
                                      <div className="bg-white/20 p-1.5 rounded-lg">
                                        {res.link.includes('youtube') || res.link.includes('youtu.be') ? <Play size={12} fill="currentColor" /> : <Download size={12} />}
                                      </div>
                                      {res.link.includes('youtube') || res.link.includes('youtu.be') ? 'Watch Lesson' : 'Download File'}
                                    </a>
                                    <a 
                                      href={res.link} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="text-slate-400 hover:text-brand-red transition-colors p-2"
                                      title="Open Link"
                                    >
                                      <ExternalLink size={18} />
                                    </a>
                                  </div>
                               </div>
                               <div className="w-full md:w-32 aspect-square bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner group-hover:rotate-3 transition-transform">
                                  {getFileIcon(res.fileType, res.link)}
                               </div>
                            </div>
                         </motion.div>
                      ))
                    ) : (
                      <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                        <FileBox className="mx-auto text-slate-200 mb-4" size={48} />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Files Found</h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">
                           No resources have been linked to this chapter yet. Our team is working on uploading the best content for you.
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
                          <h2 className="text-2xl font-black uppercase tracking-tight">Practice Quiz</h2>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question {quizStep + 1} of {quizQuestions.length}</span>
                        </div>
                        
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                          <div 
                            className="h-full bg-brand-red rounded-full transition-all duration-500" 
                            style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} 
                          />
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
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
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 disabled:opacity-30 uppercase text-xs tracking-widest"
                          >
                            <ChevronLeft size={20} />
                            Previous
                          </button>
                          <button 
                            onClick={handleQuizSubmit}
                            className="bg-brand-red text-white px-10 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-brand-red/25 flex items-center gap-2 hover:bg-red-800 transition-all"
                          >
                            {quizStep === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 space-y-6">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                          <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight">Quiz Completed!</h2>
                        <p className="text-slate-500 font-medium">Great job! You've successfully completed the practice quiz for this chapter.</p>
                        <div className="text-6xl font-black text-brand-red tracking-tighter">{quizScore}%</div>
                        <div className="flex justify-center gap-4 pt-8">
                          <button 
                            onClick={() => { setQuizScore(null); setQuizStep(0); }}
                            className="px-8 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-black uppercase text-xs tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-all"
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
             <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <MessageSquare size={24} className="text-brand-accent" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-wider mb-4">Study Circle</h3>
                <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">
                  Join a community of 1,200+ students. Share notes, discuss concepts, and grow together.
                </p>
                <button className="w-full py-4 bg-brand-red text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-800 transition-all shadow-lg shadow-brand-red/20 flex items-center justify-center gap-2">
                  <Send size={16} />
                  Join Telegram
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
               <h3 className="text-lg font-black uppercase tracking-wider mb-6 text-slate-900 dark:text-white">Quick Stats</h3>
               <div className="space-y-4">
                  {[
                    { label: 'Completion Rate', value: '78%' },
                    { label: 'Avg Quiz Score', value: '82' },
                    { label: 'Active Students', value: '1.2k' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800 last:border-0">
                       <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</span>
                       <span className="text-sm font-black text-brand-red">{stat.value}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
