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
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Fallback gradient if image doesn't exist */}
        <div className="absolute inset-0 bg-gradient-to-br from-olive-green/35 via-natural-wood/25 to-sand-beige/45" />
      </div>

      {/* Light Overlay for text readability */}
      <div className="absolute inset-0 bg-sand-beige/20" />

      {/* Content */}
      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="mb-6">
          <span 
            className={`inline-block text-sm md:text-base text-white font-light mb-4 animate-fade-in ${
              language === 'ar' ? 'tracking-normal' : 'tracking-[0.2em] uppercase'
            }`}
            style={{ 
              animationDelay: '0.2s', 
              animationFillMode: 'both', 
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
              letterSpacing: language === 'ar' ? '0' : '0.2em'
            }}
          >
            {t.hero.tagline}
          </span>
        </div>
        
        <h1 
          className={`font-normal text-white mb-6 md:mb-8 leading-tight md:whitespace-nowrap relative ${
            language === 'ar' 
              ? 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl' 
              : 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
          }`}
          style={{ 
            fontFamily: language === 'ar' 
              ? "'Zain', serif" 
              : "'Playfair Display', serif",
            fontWeight: language === 'ar' ? 700 : 500,
            letterSpacing: language === 'ar' ? '0' : '-0.03em',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.4), 0 4px 24px rgba(0, 0, 0, 0.3)'
          }}
        >
          <span className="inline-block">{t.hero.title}</span>
          <span 
            className="inline-block italic text-white"
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
        
        <p className="text-lg md:text-xl lg:text-2xl text-white mb-12 font-light leading-relaxed max-w-3xl mx-auto text-balance px-4 mt-0" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
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
            className="px-10 py-4 bg-olive-green text-sand-beige rounded-full font-medium hover:bg-olive-green/95 transition-all duration-300 shadow-md hover:shadow-lg text-base tracking-wide"
          >
            {t.hero.cta}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-70">
        <svg className="w-5 h-5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

