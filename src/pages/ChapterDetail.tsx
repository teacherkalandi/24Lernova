import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
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
  Trophy
} from 'lucide-react';

export default function ChapterDetail() {
  const { id, subjectId, chapterId } = useParams();
  const [activeTab, setActiveTab] = useState<'notes' | 'video' | 'quiz'>('video');
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

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
              Back to Subject
            </Link>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm font-bold text-brand-red bg-red-50 dark:bg-red-900/20 px-4 py-1.5 rounded-full">
                <Download size={14} />
                Download PDF
              </button>
            </div>
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
                <span>Chapter {chapterId}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>30 Min Read</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Fundamental Concepts & Principles
              </h1>
            </div>

            {/* Content Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
              {[
                { id: 'video', label: 'Video Lesson', icon: Play },
                { id: 'notes', label: 'Study Notes', icon: FileText },
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
                {activeTab === 'video' && (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative group"
                  >
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </motion.div>
                )}

                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm prose dark:prose-invert max-w-none"
                  >
                    <h2 className="text-2xl font-bold mb-6">Chapter Overview</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      In this chapter, we explore the core principles that govern our understanding of the subject. 
                      We will look at historical developments, modern interpretations, and practical applications.
                    </p>
                    <h3 className="text-xl font-bold mb-4">1. Key Definitions</h3>
                    <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                      <li><strong>Concept A:</strong> The primary building block of our theoretical framework.</li>
                      <li><strong>Concept B:</strong> How we measure and observe these phenomena in real-world scenarios.</li>
                      <li><strong>Concept C:</strong> The relationship between different variables in a controlled environment.</li>
                    </ul>
                    <div className="mt-12 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800">
                      <h4 className="text-brand-red dark:text-brand-red font-bold mb-2">Pro Tip:</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Always remember to cross-reference these notes with the video lecture for a more comprehensive understanding.
                      </p>
                    </div>
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
                          <button className="px-8 py-3 bg-brand-red text-white rounded-xl font-bold">
                            Next Chapter
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Comments Section */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="text-brand-red" size={24} />
                <h2 className="text-2xl font-bold">Doubts & Comments</h2>
              </div>
              
              <div className="flex gap-4 mb-12">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-brand-red font-bold shrink-0">
                  U
                </div>
                <div className="flex-1 relative">
                  <textarea 
                    placeholder="Ask a doubt or share your thoughts..." 
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-brand-red transition-all min-h-[100px] text-slate-900 dark:text-white"
                  />
                  <button className="absolute bottom-3 right-3 bg-brand-red text-white p-2 rounded-xl shadow-lg">
                    <Send size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {[
                  { user: 'Rahul K.', comment: 'Can you explain the relationship between Concept A and B again?', time: '2 hours ago' },
                  { user: 'Sneha M.', comment: 'The practical examples really helped in understanding the theory. Thanks!', time: '5 hours ago' },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold shrink-0">
                      {item.user[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{item.user}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.comment}
                      </p>
                    </div>
                  </li>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Course Content</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Link
                    key={num}
                    to={`/class/${id}/subject/${subjectId}/chapter/${num}`}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      num.toString() === chapterId 
                        ? 'bg-red-50 dark:bg-red-900/30 text-brand-red border border-red-100 dark:border-red-800' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      num.toString() === chapterId ? 'bg-brand-red text-white' : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      {num}
                    </div>
                    <span className="text-sm font-bold truncate">Chapter {num} Title</span>
                    {num < parseInt(chapterId || '0') && <CheckCircle2 size={16} className="text-emerald-500 ml-auto" />}
                  </Link>
                ))}
              </div>
            </div>

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
