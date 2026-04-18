import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SchoolEducation() {
  const classes = [
    { id: '1', name: 'Class 1', subjects: 8, color: 'bg-rose-500', icon: '🎨' },
    { id: '2', name: 'Class 2', subjects: 8, color: 'bg-sky-500', icon: '🎭' },
    { id: '3', name: 'Class 3', subjects: 8, color: 'bg-amber-500', icon: '🚀' },
    { id: '4', name: 'Class 4', subjects: 8, color: 'bg-emerald-500', icon: '🔬' },
    { id: '5', name: 'Class 5', subjects: 8, color: 'bg-indigo-500', icon: '📚' },
    { id: '6', name: 'Class 6', subjects: 8, color: 'bg-violet-500', icon: '🧩' },
    { id: '7', name: 'Class 7', subjects: 8, color: 'bg-orange-500', icon: '🔍' },
    { id: '8', name: 'Class 8', subjects: 8, color: 'bg-teal-500', icon: '🌍' },
    { id: '9', name: 'Class 9', subjects: 8, color: 'bg-cyan-500', icon: '📐' },
    { id: '10', name: 'Class 10', subjects: 8, color: 'bg-pink-500', icon: '🎓' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-brand-red dark:text-white mb-4 uppercase tracking-tight">
            School <span className="text-brand-accent">Education</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
            High-quality learning resources for students from Class 1 to 10. Choose your class to begin your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {classes.map((cls) => (
            <motion.div
              key={cls.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className={`${cls.color} h-2`} />
              <div className="p-6 flex flex-col flex-grow">
                <div className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl">
                  {cls.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 uppercase">{cls.name}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase mb-6">{cls.subjects} Subjects Available</p>
                <Link 
                  to={`/class/${cls.id}`}
                  className="mt-auto flex items-center justify-between w-full bg-slate-50 dark:bg-slate-800 hover:bg-brand-red hover:text-white p-3 rounded-lg transition-all group"
                >
                  <span className="text-xs font-black uppercase">View Subjects</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-brand-red dark:text-white mb-6 uppercase tracking-tight">
              Why Study with <span className="text-brand-accent">24Lernova?</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: 'NCERT Based Curriculum', desc: 'All materials are strictly based on the latest NCERT guidelines.' },
                { title: 'Interactive Quizzes', desc: 'Test your knowledge with chapter-wise interactive quizzes.' },
                { title: 'Downloadable Notes', desc: 'Get high-quality PDF notes for quick revision before exams.' },
                { title: 'Performance Tracking', desc: 'Monitor your progress with our advanced dashboard.' },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="bg-brand-accent/10 p-2 rounded-lg h-fit">
                    <CheckCircle2 className="text-brand-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 dark:text-white uppercase text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-red/10 rounded-3xl rotate-3" />
            <img 
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
              alt="Learning" 
              className="relative rounded-2xl shadow-2xl border-4 border-white dark:border-slate-800"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
