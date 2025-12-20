import { useEffect, useState } from 'react';
import patternWall2 from '../assets/pattern-wall-2.png';
import logo from '../assets/sara-logo.png';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const Hero2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[700px] overflow-hidden bg-sand-beige">
      {/* Pattern Wallpaper Background - Using pattern-wall-2 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${patternWall2})`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      />

      {/* Subtle Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand-beige/70 via-sand-beige/50 to-sand-beige/70" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-10 md:space-y-12 lg:space-y-14">
          
          {/* Logo */}
          <div 
            className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ 
              animationDelay: '0.2s', 
              animationFillMode: 'both',
              animationDuration: '1s',
              animationTimingFunction: 'ease-out'
            }}
          >
            <img 
              src={logo} 
              alt="Sara Cafe Logo" 
              className="mx-auto h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
              style={{ 
                filter: 'drop-shadow(0 4px 16px rgba(101, 132, 111, 0.2))',
              }}
            />
          </div>

          {/* Elegant Divider */}
          <div 
            className={`mx-auto w-24 h-px bg-gradient-to-r from-transparent via-olive-green/40 to-transparent ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ 
              animationDelay: '0.4s', 
              animationFillMode: 'both',
              animationDuration: '1s'
            }}
          />

          {/* Tagline */}
          <div 
            className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ 
              animationDelay: '0.5s', 
              animationFillMode: 'both',
              animationDuration: '1s',
              animationTimingFunction: 'ease-out'
            }}
          >
            <p 
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-olive-green font-semibold ${
                language === 'ar' ? 'tracking-normal' : 'tracking-[0.02em]'
              }`}
              style={{ 
                fontFamily: language === 'ar' ? "'Zain', serif" : "'Playfair Display', serif",
                letterSpacing: language === 'ar' ? '0' : '0.02em',
                lineHeight: '1.2',
                fontWeight: language === 'ar' ? 600 : 500,
                textShadow: '0 2px 12px rgba(101, 132, 111, 0.15)'
              }}
            >
              {t.hero.slogan}
            </p>
          </div>
          
          {/* CTA Button */}
          <div 
            className={`pt-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ 
              animationDelay: '0.7s', 
              animationFillMode: 'both',
              animationDuration: '1s',
              animationTimingFunction: 'ease-out'
            }}
          >
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                const menuSection = document.getElementById('menu');
                if (menuSection) {
                  menuSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-block px-10 sm:px-12 md:px-14 py-4 sm:py-4.5 md:py-5 bg-olive-green text-sand-beige rounded-full font-medium hover:bg-olive-green/95 transition-all duration-300 shadow-xl hover:shadow-2xl text-base sm:text-lg md:text-xl tracking-wide hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontFamily: language === 'ar' ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                boxShadow: '0 8px 24px rgba(101, 132, 111, 0.3), 0 4px 12px rgba(101, 132, 111, 0.2)',
                letterSpacing: '0.05em'
              }}
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10 opacity-50 hover:opacity-80 transition-opacity duration-300">
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 text-olive-green/70 animate-bounce" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero2;

