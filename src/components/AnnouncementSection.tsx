import { Bell, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function AnnouncementSection() {
  const announcements = [
    {
      id: '1',
      title: 'New Chapter Added: Quantum Mechanics for Class 12 Physics',
      date: '22 Mar 2026',
      tag: 'New Content',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Daily Quiz for Class 10 Mathematics is now LIVE!',
      date: '21 Mar 2026',
      tag: 'Live Quiz',
      color: 'bg-emerald-500'
    },
    {
      id: '3',
      title: 'Previous Year Question Papers (2025) uploaded for all subjects',
      date: '20 Mar 2026',
      tag: 'Resources',
      color: 'bg-indigo-500'
    },
    {
      id: '4',
      title: 'Scholarship Test 2026 Registration starts from April 1st',
      date: '19 Mar 2026',
      tag: 'Important',
      color: 'bg-amber-500'
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Announcements List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <Bell size={20} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Latest <span className="text-indigo-600">Updates</span>
                </h2>
              </div>
              <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
            </div>

            <div className="space-y-4">
              {announcements.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.color}`} />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 tracking-wider uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {item.date}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] text-white ${item.color}`}>
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links / Resources Card */}
          <div className="space-y-8">
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8" />
              <h3 className="text-2xl font-black mb-4 relative z-10">Quick Resources</h3>
              <p className="text-indigo-100 mb-8 text-sm leading-relaxed relative z-10">
                Download previous year papers, sample questions, and study guides instantly.
              </p>
              <div className="space-y-3 relative z-10">
                {['Question Papers', 'NCERT Solutions', 'Syllabus 2026', 'Exam Schedule'].map((link) => (
                  <button key={link} className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-bold">
                    {link}
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-500/20">
              <h3 className="text-2xl font-black mb-4">Daily Quiz</h3>
              <p className="text-emerald-50: mb-8 text-sm leading-relaxed">
                Test your knowledge and earn coins! New quizzes updated every 24 hours.
              </p>
              <button className="w-full bg-white text-emerald-600 py-4 rounded-xl font-black text-sm shadow-xl hover:scale-[1.02] transition-all">
                START QUIZ NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
