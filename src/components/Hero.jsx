import { useEffect, useState } from 'react';
import heroImage from '../assets/hero-image.jpg';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[20s] ease-out hover:scale-100"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Fallback gradient if image doesn't exist */}
        <div className="absolute inset-0 bg-gradient-to-br from-olive-green/35 via-natural-wood/25 to-sand-beige/45" />
      </div>

      {/* Sophisticated Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand-beige/70 via-sand-beige/50 to-sand-beige/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-olive-green/5 via-transparent to-natural-wood/5" />

      {/* Watercolor-style Floating Orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Top-right orb - Large (500px) - Hidden on mobile */}
        <div 
          className="hidden md:block absolute top-20 right-10 w-[500px] h-[500px] bg-[#65846F] rounded-full opacity-[0.04] blur-3xl animate-pulse"
        />
        
        {/* Bottom-left orb - Medium (400px) - Hidden on mobile */}
        <div 
          className="hidden md:block absolute bottom-20 left-10 w-[400px] h-[400px] bg-[#65846F] rounded-full opacity-[0.04] blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Center-right orb - Medium (300px) - Hidden on mobile */}
        <div 
          className="hidden md:block absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#65846F] rounded-full opacity-[0.03] blur-2xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Additional orb - Top-center (350px) - Hidden on mobile */}
        <div 
          className="hidden md:block absolute top-16 left-1/2 w-[350px] h-[350px] bg-[#65846F] rounded-full opacity-[0.03] blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s', transform: 'translateX(-50%)' }}
        />
        
        {/* Additional orb - Bottom-right (450px) - Hidden on mobile */}
        <div 
          className="hidden md:block absolute bottom-24 right-16 w-[450px] h-[450px] bg-[#65846F] rounded-full opacity-[0.04] blur-2xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Mobile-only smaller orbs - positioned away from center content */}
        <div 
          className={`md:hidden absolute top-8 ${language === 'ar' ? 'left-4' : 'right-4'} w-[200px] h-[200px] bg-[#65846F] rounded-full opacity-[0.03] blur-3xl animate-pulse`}
        />
        <div 
          className={`md:hidden absolute bottom-8 ${language === 'ar' ? 'right-4' : 'left-4'} w-[180px] h-[180px] bg-[#65846F] rounded-full opacity-[0.03] blur-3xl animate-pulse`}
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Decorative Watercolor Accents */}
      <div className={`absolute top-24 ${language === 'ar' ? 'left-12' : 'right-12'} w-40 h-40 opacity-15 animate-fade-in`} style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-olive-green">
          <path
            d="M30,50 Q50,30 70,50 T110,50"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.4" />
          <path
            d="M45,45 Q50,40 55,45"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="mb-6">
          <span className="inline-block text-sm md:text-base text-olive-green/80 font-light tracking-[0.2em] uppercase mb-4 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            {t.hero.tagline}
          </span>
        </div>
        
        <h1 
          className={`font-normal text-olive-green mb-6 md:mb-8 leading-tight md:whitespace-nowrap relative ${
            language === 'ar' 
              ? 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl' 
              : 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
          }`}
          style={{ 
            fontFamily: language === 'ar' 
              ? "'Zain', serif" 
              : "'Playfair Display', serif",
            fontWeight: language === 'ar' ? 700 : 500,
            textShadow: '0 2px 30px rgba(101, 132, 111, 0.2), 0 4px 60px rgba(101, 132, 111, 0.1)',
            letterSpacing: language === 'ar' ? '0' : '-0.03em'
          }}
        >
          <span className="inline-block">{t.hero.title}</span>
          <span 
            className="inline-block italic text-olive-green"
            style={{
              fontFamily: language === 'ar' ? "'Zain', serif" : "'Playfair Display', serif",
              fontWeight: language === 'ar' ? 600 : 400,
              fontSize: language === 'ar' ? '0.92em' : '0.88em',
              fontStyle: 'italic',
              marginLeft: language === 'ar' ? '0' : '0.75rem',
              marginRight: language === 'ar' ? '0.75rem' : '0'
            }}
          >
            {t.hero.cafeName}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-warm-gray/90 mb-12 font-light leading-relaxed max-w-3xl mx-auto text-balance px-4 mt-0">
          {t.hero.description}
        </p>
        
        <div className="flex justify-center gap-4">
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              const menuSection = document.getElementById('menu');
              if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group px-10 py-4 bg-olive-green text-sand-beige rounded-full font-medium hover:bg-olive-green/95 transition-all duration-500 shadow-lg hover:shadow-2xl hover-lift text-base tracking-wide relative overflow-hidden"
          >
            <span className="relative z-10">{t.hero.cta}</span>
            <span className={`absolute inset-0 bg-gradient-to-r from-olive-green/0 via-white/10 to-olive-green/0 ${language === 'ar' ? 'translate-x-[100%] group-hover:translate-x-[-100%]' : 'translate-x-[-100%] group-hover:translate-x-[100%]'} transition-transform duration-1000`}></span>
          </a>
        </div>
      </div>

      {/* Elegant Leaf Illustration Accents */}
      <div className={`absolute bottom-24 ${language === 'ar' ? 'right-12' : 'left-12'} w-28 h-28 opacity-12 animate-fade-in`} style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-natural-wood">
          <path
            d="M50,20 Q30,40 50,60 Q70,40 50,20 M50,60 Q40,70 50,80 Q60,70 50,60"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="50" cy="40" r="2" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
      
      <div className={`absolute top-1/2 ${language === 'ar' ? 'right-8' : 'left-8'} w-20 h-20 opacity-8 animate-fade-in`} style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-olive-green">
          <path
            d="M50,30 Q35,50 50,70 Q65,50 50,30"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-60">
        <svg className="w-6 h-6 text-olive-green" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

