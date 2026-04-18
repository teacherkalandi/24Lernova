import { motion } from 'motion/react';
import { Trophy, ArrowRight, Target, Zap, Award, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompetitiveExams() {
  const exams = [
    { 
      id: 'jee', 
      name: 'JEE Mains & Advanced', 
      desc: 'Engineering entrance preparation with advanced physics, chemistry, and math.',
      icon: Target,
      color: 'text-white',
      bg: 'bg-gradient-to-br from-blue-600 to-indigo-700'
    },
    { 
      id: 'neet', 
      name: 'NEET UG', 
      desc: 'Medical entrance focus with detailed biology, chemistry, and physics.',
      icon: Award,
      color: 'text-white',
      bg: 'bg-gradient-to-br from-rose-600 to-red-700'
    },
    { 
      id: 'olympiads', 
      name: 'Olympiads', 
      desc: 'International level competition preparation for Math, Science, and English.',
      icon: Zap,
      color: 'text-white',
      bg: 'bg-gradient-to-br from-amber-500 to-orange-600'
    },
    { 
      id: 'scholarships', 
      name: 'NTSE & KVPY', 
      desc: 'Scholarship exam preparation for high school students.',
      icon: Flame,
      color: 'text-white',
      bg: 'bg-gradient-to-br from-emerald-500 to-teal-600'
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-brand-red dark:text-white mb-4 uppercase tracking-tight">
            Competitive <span className="text-brand-accent">Exams</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
            Ace the most challenging exams with our specialized resources and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {exams.map((exam) => (
            <motion.div
              key={exam.id}
              whileHover={{ y: -5 }}
              className={`rounded-3xl shadow-xl p-8 border border-white/10 flex gap-6 ${exam.bg}`}
            >
              <div className="bg-white/20 text-white p-6 rounded-2xl h-fit shrink-0 border border-white/20">
                <exam.icon size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase">{exam.name}</h3>
                <p className="text-white/80 mb-6 font-medium text-sm leading-relaxed">
                  {exam.desc}
                </p>
                <Link 
                  to={`/competitive-exams/${exam.id}`}
                  className="inline-flex items-center gap-2 text-brand-accent font-black uppercase text-xs tracking-wider hover:gap-4 transition-all"
                >
                  Start Preparation
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-brand-red rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-black mb-2">500+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/70">Top Rankers</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">10k+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/70">Practice Questions</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">95%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/70">Success Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-brand-red dark:text-white mb-8 uppercase tracking-tight">
            Ready to <span className="text-brand-accent">Succeed?</span>
          </h2>
          <button className="bg-brand-accent text-brand-red px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-brand-accent/20">
            Join the Elite Batch
          </button>
        </div>
      </div>
    </motion.div>
  );
}
