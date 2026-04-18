import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Home, 
  LayoutDashboard, 
  FileText, 
  Phone,
  Moon,
  Sun,
  Accessibility,
  Globe,
  User
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { 
      name: 'School Education', 
      path: '/school-education', 
      dropdown: [
        { name: 'Class 1-5', path: '/school-education#primary' },
        { name: 'Class 6-8', path: '/school-education#middle' },
        { name: 'Class 9-10', path: '/school-education#secondary' },
      ]
    },
    { 
      name: 'Competitive Exams', 
      path: '/competitive-exams',
      dropdown: [
        { name: 'Engineering (JEE)', path: '/competitive-exams/jee' },
        { name: 'Medical (NEET)', path: '/competitive-exams/neet' },
        { name: 'Olympiads', path: '/competitive-exams/olympiads' },
        { name: 'NTSE/KVPY', path: '/competitive-exams/scholarships' },
      ]
    },
    { name: 'Resources', path: '/resources', icon: FileText },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Internal Portal', path: '/internal-portal', icon: FileText },
    { name: 'Contact Us', path: '/contact', icon: Phone },
  ];

  return (
    <header className="z-50 w-full bg-white dark:bg-slate-900 shadow-sm">
      {/* Top Bar (Accessibility & Language) */}
      <div className="bg-brand-red text-white py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-medium uppercase tracking-wider">
          <div className="flex gap-4 items-center">
            <Link to="/skip-to-content" className="hover:underline">Skip to main content</Link>
            <span className="opacity-30">|</span>
            <div className="flex gap-2 items-center">
              <Accessibility size={12} />
              <button className="hover:underline">Screen Reader Access</button>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Globe size={12} />
              <button className="hover:underline">English</button>
              <span className="opacity-30">|</span>
              <button className="hover:underline">हिन्दी</button>
            </div>
            <span className="opacity-30">|</span>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="hover:text-brand-accent transition-colors flex items-center gap-1">
              {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-brand-red text-white p-3 rounded-xl font-black text-2xl shadow-lg">
            24L
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl font-black text-brand-red dark:text-white leading-tight tracking-tighter">
              24LERNOVA
            </h1>
            <p className="text-[10px] md:text-xs font-bold text-brand-accent dark:text-brand-accent uppercase tracking-[0.2em] -mt-1">
              Empowering Future Leaders
            </p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
            <User className="text-brand-red" size={20} />
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">
              Student Login
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-brand-red dark:bg-slate-800 sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <nav className="hidden lg:flex items-center h-full">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative h-full"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "px-4 h-full flex items-center text-xs font-bold uppercase tracking-wider transition-all gap-1 border-r border-white/10",
                      location.pathname === item.path 
                        ? "bg-brand-accent text-white" 
                        : "text-white hover:bg-white/10"
                    )}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown size={12} className={cn("transition-transform", activeDropdown === item.name && "rotate-180")} />}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full w-56 bg-white dark:bg-slate-800 border-t-2 border-brand-accent shadow-2xl py-0 overflow-hidden z-[60]"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block px-4 py-3 text-[11px] font-bold uppercase text-slate-700 dark:text-slate-200 hover:bg-brand-light-red dark:hover:bg-slate-700 hover:text-brand-red border-b border-slate-100 dark:border-slate-700 last:border-0 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Search */}
            <div className="hidden md:flex items-center h-full">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-white/10 text-white placeholder:text-white/50 text-xs px-3 py-1.5 rounded-l border border-white/20 outline-none focus:bg-white/20 w-32 lg:w-48"
                />
                <button className="bg-brand-accent text-white px-3 py-1.5 rounded-r border border-brand-accent hover:bg-red-600 transition-colors">
                  <Search size={14} />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <span className="text-white font-bold text-xs uppercase tracking-widest">Menu</span>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-red dark:bg-slate-900 border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => !item.dropdown && setIsMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded text-xs font-bold uppercase text-white hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && <item.icon size={18} />}
                      {item.name}
                    </div>
                    {item.dropdown && <ChevronDown size={16} />}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-8 space-y-1 pb-2 bg-black/10 rounded-b">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 text-[10px] font-bold uppercase text-white/70 hover:text-white"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
