import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const govtPortals = [
    { name: 'National Portal of India', url: 'https://india.gov.in' },
    { name: 'Ministry of Education', url: 'https://education.gov.in' },
    { name: 'Digital India', url: 'https://digitalindia.gov.in' },
    { name: 'MyGov', url: 'https://mygov.in' },
    { name: 'Data Portal India', url: 'https://data.gov.in' },
  ];

  const footerLinks = [
    {
      title: 'Education',
      links: [
        { name: 'School Education', path: '/school-education' },
        { name: 'Competitive Exams', path: '/competitive-exams' },
        { name: 'Video Lessons', path: '/resources' },
        { name: 'Practice Tests', path: '/resources' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Help Center', path: '/help' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Feedback', path: '/feedback' },
        { name: 'Sitemap', path: '/sitemap' },
      ]
    }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-brand-red text-white p-2 rounded-lg font-black text-xl">
                24L
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tighter uppercase">
                  24LERNOVA
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Empowering Future Leaders
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              24Lernova is a premier educational platform dedicated to providing high-quality learning resources for school students and competitive exam aspirants.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm hover:text-brand-accent transition-colors flex items-center gap-2">
                      <ExternalLink size={12} className="opacity-50" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Details</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-brand-accent shrink-0" />
                <span>123, Education Hub, Knowledge City, New Delhi - 110001</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-brand-accent shrink-0" />
                <span>+91-9876543210</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-brand-accent shrink-0" />
                <span>support@24lernova.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap justify-center gap-6">
            <span>© {currentYear} 24Lernova. All Rights Reserved.</span>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>
          <div className="flex items-center gap-2">
            <span>Visitor Count:</span>
            <span className="bg-slate-800 px-2 py-1 rounded font-mono text-white">45,678</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
