import { Bell, ArrowRight, ExternalLink, Info, ChevronRight, Video, PenSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function AnnouncementSection() {
  const announcements = [
    "Notification for GDS to MTS Exam 2026 released.",
    "New Mock Test for PA/SA Exam added.",
    "Updated PO Guide Part I notes available.",
    "Join our Telegram group for daily updates."
  ];

  const quickHelp = [
    "Job specification contact details of CO",
    "Copyright Policy",
    "Feedback on Textbooks"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Announcements & Quick Help */}
          <div className="space-y-8">
            {/* Announcements */}
            <div className="bg-white">
              <div className="flex items-center justify-between mb-4 border-b border-brand-red pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="text-brand-red" size={20} />
                  <h2 className="text-xl font-black text-brand-red uppercase tracking-tight">Announcements</h2>
                </div>
                <button className="text-[10px] font-black text-slate-400 hover:text-brand-red uppercase tracking-widest">View All</button>
              </div>
              <div className="space-y-4">
                {announcements.map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3 group cursor-pointer">
                    <div className="w-1 h-5 bg-brand-accent/30 group-hover:bg-brand-red transition-colors mt-0.5" />
                    <p className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-red-50/50 rounded-lg p-6 border border-red-100/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Info className="text-brand-red" size={16} />
                </div>
                <h3 className="text-sm font-black text-brand-red uppercase tracking-tight">Quick Help</h3>
              </div>
              <div className="space-y-3">
                {quickHelp.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 group cursor-pointer">
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-brand-red transition-all" />
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column: Virtual Classes */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-8 border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex flex-col"
          >
            <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
              <Video className="text-blue-500" size={32} />
            </div>
            <h3 className="text-xl font-black text-[#002b55] mb-4 uppercase tracking-tight">Virtual Classes</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
              Watch high-quality educational videos and live sessions by expert teachers.
            </p>
            <button className="mt-auto flex items-center gap-2 text-[10px] font-black text-brand-red uppercase tracking-[0.15em] hover:opacity-80 transition-opacity">
              Explore Videos <ExternalLink size={14} />
            </button>
          </motion.div>

          {/* Right Column: Practice Quizzes */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-8 border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex flex-col"
          >
            <div className="w-16 h-16 rounded-xl bg-emerald-50 flex items-center justify-center mb-6">
              <PenSquare className="text-emerald-500" size={32} />
            </div>
            <h3 className="text-xl font-black text-[#002b55] mb-4 uppercase tracking-tight">Practice Quizzes</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
              Test your knowledge with interactive quizzes and track your progress.
            </p>
            <button className="mt-auto flex items-center gap-2 text-[10px] font-black text-brand-red uppercase tracking-[0.15em] hover:opacity-80 transition-opacity">
              Start Quiz <ExternalLink size={14} />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
