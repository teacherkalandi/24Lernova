import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function ClassesGrid() {
  const classes = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              Explore by <span className="text-indigo-600">Class</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Select your class to access tailored study materials, NCERT solutions, and interactive learning modules.
            </p>
          </div>
          <Link to="/classes" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            View All Classes
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {classes.map((num, index) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/class/${num}`}
                className="group block bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-slate-800 transition-all text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-bl-full group-hover:bg-indigo-500/10 transition-all" />
                <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl shadow-sm flex items-center justify-center text-indigo-600 mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Class {num}</h3>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Secondary
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
