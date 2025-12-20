import { useEffect, useState } from 'react';
import heroImageTwo from '../assets/hero-image-two.jpg';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const Hero4 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImageTwo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 5%',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Tagline and CTA - Bottom Left Corner */}
      <div 
        className={`absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 ${language === 'ar' ? 'right-6 sm:right-8 md:right-10 lg:right-12' : 'left-6 sm:left-8 md:left-10 lg:left-12'} z-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ 
          animationDelay: '0.4s', 
          animationFillMode: 'both',
          animationDuration: '0.8s'
        }}
      >
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* Tagline - Bold Text with Shadow */}
          <p 
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold ${
              language === 'ar' ? 'tracking-normal' : 'tracking-wide'
            }`}
            style={{ 
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.6), 0 4px 30px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.5)',
              fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
              letterSpacing: language === 'ar' ? '0' : '0.05em',
              lineHeight: '1.2'
            }}
          >
            {t.hero.slogan}
          </p>
          
          {/* CTA Button */}
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              const menuSection = document.getElementById('menu');
              if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-olive-green text-sand-beige rounded-full font-semibold hover:bg-olive-green/90 transition-all duration-300 shadow-xl hover:shadow-2xl text-sm sm:text-base md:text-lg tracking-wide hover:scale-105 active:scale-95 w-fit"
            style={{
              fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
              textShadow: 'none',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            {t.hero.cta}
          </a>
        </div>
      </div>

      {/* Scroll Indicator - Bottom Center */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))'
          }}
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero4;

