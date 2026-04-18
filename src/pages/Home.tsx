import Hero from '../components/Hero';
import AnnouncementSection from '../components/AnnouncementSection';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  BookOpen, 
  Trophy,
  GraduationCap,
  Users,
  Star,
  CheckCircle2,
  Play,
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
    <main className="min-h-screen bg-white relative">
      <Hero />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[600px] left-0 w-full h-[1500px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-3xl -mr-[400px]" />
        <div className="absolute top-[400px] left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl -ml-[300px]" />
        <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-brand-red/5 rounded-full blur-3xl -mr-[500px]" />
      </div>

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
              className="group relative bg-brand-red text-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[450px]"
            >
              <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110">
                <img 
                   src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
                   alt="School" 
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-red via-brand-red/80 to-transparent" />
              <div className="relative p-10 md:p-14 h-full flex flex-col justify-end">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl w-fit mb-6 border border-white/20">
                  <BookOpen className="text-brand-accent" size={40} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase leading-tight">
                  School <span className="text-brand-accent italic">Education</span>
                </h3>
                <p className="text-white/80 mb-8 font-medium leading-relaxed max-w-sm">
                  Comprehensive study materials, video lessons, and practice tests for students from Class 1 to 10.
                </p>
                <Link 
                  to="/school-education" 
                  className="inline-flex items-center gap-2 bg-brand-accent text-brand-red px-10 py-5 rounded-2xl font-black uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-xl w-fit"
                >
                  Explore Now
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Competitive Exams Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-brand-accent text-brand-red rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[450px]"
            >
              <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110">
                <img 
                   src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" 
                   alt="Exams" 
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-accent via-brand-accent/80 to-transparent" />
              <div className="relative p-10 md:p-14 h-full flex flex-col justify-end">
                <div className="bg-brand-red/10 backdrop-blur-md p-4 rounded-2xl w-fit mb-6 border border-brand-red/10">
                  <Trophy className="text-brand-red" size={40} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase leading-tight">
                  Competitive <span className="text-brand-red italic">Exams</span>
                </h3>
                <p className="text-brand-red/80 mb-8 font-medium leading-relaxed max-w-sm">
                  Specialized coaching and resources for JEE, NEET, Olympiads, and NTSE. Push your boundaries.
                </p>
                <Link 
                  to="/competitive-exams" 
                  className="inline-flex items-center gap-2 bg-brand-red text-white px-10 py-5 rounded-2xl font-black uppercase tracking-wider hover:bg-white hover:text-brand-red hover:scale-105 transition-all shadow-xl w-fit"
                >
                  Explore Now
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
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ borderColor: exam.color, backgroundColor: `${exam.color}05` }}
                className="bg-white p-10 shadow-[0_4px_25px_rgba(0,0,0,0.05)] border-2 border-b-[10px] flex flex-col items-center text-center group transition-all rounded-3xl"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-black/5 bg-white"
                >
                  <exam.icon style={{ color: exam.color }} size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">
                  {exam.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {exam.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: exam.color }}>
                  Access portal <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnnouncementSection />

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
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-red mb-4 uppercase tracking-tight">Our <span className="text-brand-accent">Impact</span></h2>
            <p className="text-slate-500 font-medium">Measuring success through the achievements of our students.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Students Enrolled", value: "50,000+", icon: Users, color: "#E31E24" },
              { label: "Expert Educators", value: "500+", icon: GraduationCap, color: "#FFC107" },
              { label: "Course Materials", value: "10,000+", icon: BookOpen, color: "#1976D2" },
              { label: "Success Rate", value: "98%", icon: Star, color: "#2E7D32" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-50 text-center flex flex-col items-center group overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/5"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon style={{ color: stat.color }} size={32} />
                </div>
                <div className="text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video / Journey Section */}
      <section className="py-24 bg-brand-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-white">
              <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase leading-[0.9] tracking-tighter">
                Transforming Your <span className="text-brand-accent italic">Educational</span> Journey
              </h2>
              <p className="text-white/80 text-lg font-medium mb-10 leading-relaxed max-w-xl">
                We believe that every child has a unique spark. Our digital platform is designed to nurture that spark into a flame of knowledge.
              </p>
              <div className="space-y-6">
                {[
                  "Interactive Learning Modules",
                  "Personalized Progress Tracking",
                  "24/7 Expert Support Access"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                      <CheckCircle2 className="text-brand-accent group-hover:text-brand-red" size={20} />
                    </div>
                    <span className="text-sm font-black uppercase tracking-wider">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
                  alt="Learning Journey"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-24 h-24 bg-brand-accent text-brand-red rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-colors"
                  >
                    <Play size={32} className="fill-current ml-2" />
                  </motion.button>
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                  <div className="text-white font-black uppercase tracking-widest text-xs mb-1">Featured Video</div>
                  <div className="text-white/90 text-sm font-bold">Watch how 24Lernova is changing lives daily.</div>
                </div>
              </div>
            </div>
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
