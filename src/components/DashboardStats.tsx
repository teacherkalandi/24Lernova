import { BookOpen, Trophy, Users, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardStats() {
  const stats = [
    {
      label: 'Total Chapters',
      value: '1,250+',
      icon: BookOpen,
      color: 'bg-brand-red',
      lightColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400'
    },
    {
      label: 'Daily Quizzes',
      value: '500+',
      icon: CheckCircle,
      color: 'bg-brand-red',
      lightColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-brand-red'
    },
    {
      label: 'Active Students',
      value: '50,000+',
      icon: Users,
      color: 'bg-brand-red',
      lightColor: 'bg-slate-100 dark:bg-slate-900',
      textColor: 'text-slate-600 dark:text-slate-400'
    },
    {
      label: 'Top Scholars',
      value: '🏆 100+',
      icon: Trophy,
      color: 'bg-brand-accent',
      lightColor: 'bg-amber-100 dark:bg-amber-900/20',
      textColor: 'text-amber-600 dark:text-amber-400'
    }
  ];

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5 group hover:shadow-md transition-all"
            >
              <div className={`w-14 h-14 rounded-xl ${stat.lightColor} flex items-center justify-center ${stat.textColor} group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
