import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import saraLogo from '../assets/sara-logo.png';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gradient-to-b from-white via-sand-beige/50 to-sand-beige py-16 border-t border-natural-wood/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative Leaf Divider */}
        <div className="flex justify-center mb-12">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-natural-wood/30 to-transparent relative">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 opacity-25">
              <svg viewBox="0 0 100 100" className="w-full h-full text-olive-green">
                <path
                  d="M50,20 Q30,40 50,60 Q70,40 50,20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="40" r="2" fill="currentColor" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="text-center">
          <div className="flex justify-center mb-5">
            <img
              src={saraLogo}
              alt="Sara Café"
              className="h-16 md:h-20 w-auto drop-shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <h3 
              className="text-3xl font-normal text-olive-green hidden"
              style={{ 
                fontFamily: language === 'ar' 
                  ? "'Zain', sans-serif" 
                  : "'Playfair Display', serif",
                fontWeight: language === 'ar' ? 600 : 400
              }}
            >
              {t.hero.cafeName}
            </h3>
          </div>
          <p className="text-warm-gray/80 text-sm mb-8 max-w-lg mx-auto leading-relaxed font-light">
            {t.footer.tagline}
          </p>
          
          {/* Social Links */}
          <div className={`flex justify-center ${language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'} mb-10`}>
            <a
              href="#"
              className="group text-warm-gray/70 hover:text-olive-green transition-all duration-300 p-3 rounded-full hover:bg-olive-green/5"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="#"
              className="group text-warm-gray/70 hover:text-olive-green transition-all duration-300 p-3 rounded-full hover:bg-olive-green/5"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-natural-wood/10">
            <p className="text-warm-gray/60 text-xs font-light tracking-wide">
              {language === 'ar' 
                ? `© ${new Date().getFullYear()} ${t.footer.copyright}`
                : `© ${new Date().getFullYear()} ${t.footer.copyright}`
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

