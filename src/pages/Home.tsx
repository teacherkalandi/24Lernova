import Hero from '../components/Hero';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  BookOpen, 
  Trophy,
  GraduationCap,
  Users,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      
      {/* Main Selection Section */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-red dark:text-white mb-4 uppercase tracking-tight">
              Choose Your <span className="text-brand-accent">Learning Path</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Tailored educational resources for school excellence and competitive success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* School Education Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-brand-red text-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 transition-all group-hover:scale-110" />
              <div className="p-8 md:p-12">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-6 border border-white/20">
                  <BookOpen className="text-brand-accent" size={40} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase">
                  School Education
                </h3>
                <p className="text-white/80 mb-8 font-medium leading-relaxed">
                  Comprehensive study materials, video lessons, and practice tests for students from Class 1 to 10. Master your school curriculum with ease.
                </p>
                <Link 
                  to="/school-education" 
                  className="inline-flex items-center gap-2 bg-brand-accent text-brand-red px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                >
                  Explore Class 1-10
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Competitive Exams Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-brand-accent text-brand-red rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/10 rounded-full -mr-24 -mt-24 transition-all group-hover:scale-110" />
              <div className="p-8 md:p-12">
                <div className="bg-brand-red/10 p-4 rounded-2xl w-fit mb-6 border border-brand-red/10">
                  <Trophy className="text-brand-red" size={40} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase">
                  Competitive Exams
                </h3>
                <p className="text-brand-red/80 mb-8 font-medium leading-relaxed">
                  Specialized coaching and resources for JEE, NEET, Olympiads, and NTSE. Push your boundaries and achieve your dream career.
                </p>
                <Link 
                  to="/competitive-exams" 
                  className="inline-flex items-center gap-2 bg-brand-red text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-white hover:text-brand-red transition-all shadow-lg"
                >
                  Explore Competitive
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="text-brand-red" size={32} />
              </div>
              <h4 className="text-xl font-black text-brand-red dark:text-white mb-4 uppercase">Expert Faculty</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Learn from the best educators with years of experience in their fields.</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-brand-accent" size={32} />
              </div>
              <h4 className="text-xl font-black text-brand-accent dark:text-white mb-4 uppercase">Community Support</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Join a vibrant community of learners and grow together.</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-brand-red" size={32} />
              </div>
              <h4 className="text-xl font-black text-brand-red dark:text-white mb-4 uppercase">Proven Results</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Our students consistently achieve top ranks in school and competitive exams.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
