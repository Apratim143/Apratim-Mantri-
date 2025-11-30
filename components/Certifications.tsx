import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CERTIFICATIONS } from '../constants';

export const Certifications: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Function to handle scrolling with loop logic
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const { scrollLeft, scrollWidth, clientWidth } = current;
      
      // Calculate scroll amount (Card width approx 360 + gap 24)
      const scrollAmount = 384; 
      
      if (direction === 'left') {
        if (scrollLeft <= 10) {
          // If at start, loop to end
          current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        // If at end (with small buffer), loop to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  }, []);

  // Auto-play effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (!isPaused) {
      interval = setInterval(() => {
        scroll('right');
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, scroll]);

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-transparent border-t border-gray-100 dark:border-white/5 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
             <h2 className="text-4xl font-serif font-medium mb-4 text-gray-900 dark:text-white">Certifications</h2>
             <div className="h-1.5 w-24 bg-brand-accent dark:bg-nyc-cyan shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_15px_rgba(0,243,255,0.6)]"></div>
          </div>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all border-gray-300 dark:border-white/20 hover:bg-brand-accent hover:text-white dark:hover:bg-nyc-cyan dark:hover:text-black hover:border-transparent cursor-pointer text-gray-600 dark:text-white"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all border-gray-300 dark:border-white/20 hover:bg-brand-accent hover:text-white dark:hover:bg-nyc-cyan dark:hover:text-black hover:border-transparent cursor-pointer text-gray-600 dark:text-white"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
        >
          {CERTIFICATIONS.map((cert) => (
            <div 
              key={cert.id} 
              className="min-w-[300px] md:min-w-[360px] snap-center flex flex-col bg-white dark:bg-[#151520] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-300 group"
            >
              {/* Image Section - Fixed Height */}
              <div className="h-52 w-full relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                {cert.image && (
                   <img 
                     src={cert.image} 
                     alt={cert.title}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                )}
                
                {/* Hover Overlay */}
                {cert.credentialLink && (
                  <a 
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm"
                  >
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 text-white font-medium border border-white/30 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 hover:border-white/50">
                      <span>View Credential</span>
                      <i className="fa-solid fa-external-link-alt text-sm"></i>
                    </div>
                  </a>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-8 line-clamp-2">
                  {cert.title}
                </h3>
                
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 group-hover:text-brand-accent dark:group-hover:text-nyc-cyan transition-colors">
                    <i className="fa-solid fa-building-columns"></i>
                    <span className="font-medium truncate max-w-[140px]" title={cert.issuer}>{cert.issuer}</span>
                  </div>
                  
                  <div className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-500 dark:text-gray-500 group-hover:border-brand-accent/50 dark:group-hover:border-nyc-cyan/50 transition-colors">
                    {cert.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};