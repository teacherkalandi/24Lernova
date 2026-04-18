import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1523050853064-dbad350c7469?q=80&w=2070&auto=format&fit=crop",
      title: "Empowering Young Minds",
      subtitle: "24Lernova - A Premier Educational Institution"
    },
    {
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
      title: "Excellence in Education",
      subtitle: "Nurturing Talent and Character for a Better Tomorrow"
    },
    {
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
      title: "Digital India Initiative",
      subtitle: "Bringing Technology to Every Classroom"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[400px] md:h-[550px] overflow-hidden bg-slate-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/80 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={index === currentSlide ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-2xl text-white"
              >
                <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight uppercase tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/80 font-medium mb-8">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4">
                  <button className="bg-brand-accent text-brand-red px-8 py-3 rounded font-bold uppercase text-sm hover:bg-white transition-all shadow-lg">
                    Read More
                  </button>
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded font-bold uppercase text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                    <Play size={16} />
                    Watch Video
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-all"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-all"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide ? "bg-brand-accent w-8" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </section>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
