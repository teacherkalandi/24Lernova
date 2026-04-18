import Hero from '../components/Hero';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  BookOpen, 
  Trophy,
  GraduationCap,
  Users,
  Star,
  CheckCircle2,
  DraftingCompass,
  Stethoscope,
  Award,
  School,
  FileText,
  Zap,
  Compass,
  ClipboardCheck,
  UserCircle,
  Shapes,
  Gamepad,
  History,
  CreditCard,
  Target,
  FlaskConical,
  MessageSquare,
  Compass as CareerIcon,
  Library,
  Gift,
  Settings,
  Search,
  MapPin,
  Calculator,
  Fingerprint,
  Phone,
  Layout,
  Mail,
  Locate,
  Banknote,
  ArrowRightCircle
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

      {/* Exam Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">
              Exam <span className="text-brand-red">Portals</span>
            </h2>
            <div className="w-20 h-1 bg-brand-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DraftingCompass, title: "JEE Main", desc: "Engineering entrance prep", color: "#E31E24" },
              { icon: Stethoscope, title: "NEET Exam", desc: "Medical entrance resources", color: "#2E7D32" },
              { icon: School, title: "Board Exams", desc: "Class 10 & 12 material", color: "#1976D2" },
              { icon: Award, title: "Olympiads", desc: "Compete at global level", color: "#F57C00" },
              { icon: Zap, title: "State CETs", desc: "State level entrance exams", color: "#7B1FA2" },
              { icon: Star, title: "NTSE / KVPY", desc: "National scholarship prep", color: "#C2185B" },
              { icon: FileText, title: "Mock Tests", desc: "Self-assessment series", color: "#0097A7" },
              { icon: ClipboardCheck, title: "Question Bank", desc: "Previous year solved papers", color: "#455A64" },
            ].map((exam, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                style={{ borderColor: exam.color }}
                className="bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-2 border-b-8 flex flex-col items-center text-center group transition-all"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors"
                  style={{ backgroundColor: `${exam.color}10` }}
                >
                  <exam.icon style={{ color: exam.color }} size={24} />
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2 uppercase tracking-tight">
                  {exam.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {exam.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="bg-brand-accent text-brand-red text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block shadow-sm">
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#002b55] mb-4 tracking-tight">
              What would you like to do today?
            </h2>
            <p className="text-slate-500 font-medium mb-8">Access all educational services of 24Lernova</p>
            <div className="w-24 h-1 bg-brand-accent mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: UserCircle, title: "Track Progress", color: "#00C853" },
              { icon: Mail, title: "Inquiry Desk", color: "#FF5252" },
              { icon: MapPin, title: "Locate Centers", color: "#FF1744" },
              { icon: Banknote, title: "Fee Payment", color: "#FFAB00" },
              { icon: CheckCircle2, title: "Verification", color: "#2979FF" },
              { icon: Calculator, title: "GPA Calculator", color: "#FF6D00" },
              { icon: Fingerprint, title: "Student ID", color: "#651FFF" },
              { icon: Target, title: "Set Goals", color: "#F48FB1" },
              { icon: FileText, title: "Exam Forms", color: "#455A64" },
              { icon: Library, title: "DigiLibrary", color: "#5D4037" },
              { icon: Phone, title: "Call Support", color: "#2196F3" },
              { icon: ArrowRightCircle, title: "Career Shift", color: "#00BFA5" },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className="bg-white p-6 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center group cursor-pointer border border-transparent hover:border-slate-100 transition-all aspect-square min-h-[140px]"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon 
                    size={22} 
                    style={{ color: service.color }} 
                  />
                </div>
                <h4 className="text-[10px] sm:text-[11px] font-black text-slate-800 uppercase tracking-tight leading-tight px-1">
                  {service.title}
                </h4>
              </motion.div>
            ))}
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
