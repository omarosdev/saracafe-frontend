import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import saraLogo from '../assets/sara-logo.png';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import LanguageSwitcher from './LanguageSwitcher';
import { getLocalizedPath, getPathWithoutLanguage } from '../utils/routes';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const location = useLocation();
  const t = translations[language];
  
  // Get current path without language prefix for comparison
  const currentPath = getPathWithoutLanguage(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when clicking outside or on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && e.target.closest('.mobile-sidebar') === null && e.target.closest('button') === null) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-sand-beige/98 backdrop-blur-md shadow-md shadow-olive-green/5 border-b border-natural-wood/10'
            : 'bg-sand-beige/98 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={language}>
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-20 md:h-20' : 'h-28 md:h-28'
          }`}>
            {/* Logo - Left in EN, Right in AR */}
            <div className="flex-shrink-0 flex items-center group">
              <Link to={getLocalizedPath('/', language)} className="relative flex items-center">
                <img
                  src={saraLogo}
                  alt="Sara Café"
                  className={`w-auto transition-all duration-500 group-hover:scale-105 drop-shadow-sm ${
                    isScrolled ? 'h-14 md:h-14' : 'h-20 md:h-20'
                  }`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <span
                  className={`text-3xl md:text-4xl font-normal text-olive-green ${language === 'ar' ? 'mr-4' : 'ml-4'} hidden`}
                  style={{ 
                    fontFamily: language === 'ar' 
                      ? "'Zain', sans-serif" 
                      : "'Playfair Display', serif",
                    fontWeight: language === 'ar' ? 600 : 400
                  }}
                >
                  Sara Café
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links - Right in EN, Left in AR */}
            <div className="hidden md:flex items-center gap-10">
              {language === 'ar' ? (
                <>
                  <Link
                    to={getLocalizedPath('/', language)}
                    className={`relative text-warm-gray/90 hover:text-olive-green transition-colors duration-300 font-light text-sm tracking-wide uppercase group ${
                      currentPath === '/' ? 'text-olive-green' : ''
                    }`}
                  >
                    {t.nav.menu}
                    <span className={`absolute bottom-0 right-0 h-px bg-olive-green transition-all duration-300 ${currentPath === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                  <a
                    href="#store"
                    className="relative text-warm-gray/90 hover:text-olive-green transition-colors duration-300 font-light text-sm tracking-wide uppercase group"
                  >
                    {t.nav.store}
                    <span className="absolute bottom-0 right-0 w-0 h-px bg-olive-green transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <Link
                    to={getLocalizedPath('/about', language)}
                    className={`relative text-warm-gray/90 hover:text-olive-green transition-colors duration-300 font-light text-sm tracking-wide uppercase group ${
                      currentPath === '/about' ? 'text-olive-green' : ''
                    }`}
                  >
                    {t.nav.about}
                    <span className={`absolute bottom-0 right-0 h-px bg-olive-green transition-all duration-300 ${currentPath === '/about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                  <Link
                    to={getLocalizedPath('/contact', language)}
                    className={`relative text-warm-gray/90 hover:text-olive-green transition-colors duration-300 font-light text-sm tracking-wide uppercase group ${
                      currentPath === '/contact' ? 'text-olive-green' : ''
                    }`}
                  >
                    {t.nav.contact}
                    <span className={`absolute bottom-0 right-0 h-px bg-olive-green transition-all duration-300 ${currentPath === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                  <LanguageSwitcher />
                </>
              ) : (
                <>
                  <Link
                    to={getLocalizedPath('/', language)}
                    className={`relative text-warm-gray/90 hover:text-olive-green transition-colors duration-300 font-light text-sm tracking-wide uppercase group ${
                      currentPath === '/' ? 'text-olive-green' : ''
                    }`}
                  >
                    {t.nav.menu}
                    <span className={`absolute bottom-0 left-0 h-px bg-olive-green transition-all duration-300 ${currentPath === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                  <a
                    href="#store"
                    className="relative text-warm-gray/90 hover:text-olive-green transition-colors duration-300 font-light text-sm tracking-wide uppercase group"
                  >
                    {t.nav.store}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-olive-green transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <Link
                    to={getLocalizedPath('/about', language)}
                    className={`relative text-warm-gray/90 hover:text-olive-green transition-colors duration-300 font-light text-sm tracking-wide uppercase group ${
                      currentPath === '/about' ? 'text-olive-green' : ''
                    }`}
                  >
                    {t.nav.about}
                    <span className={`absolute bottom-0 left-0 h-px bg-olive-green transition-all duration-300 ${currentPath === '/about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                  <Link
                    to={getLocalizedPath('/contact', language)}
                    className={`relative text-warm-gray/90 hover:text-olive-green transition-colors duration-300 font-light text-sm tracking-wide uppercase group ${
                      currentPath === '/contact' ? 'text-olive-green' : ''
                    }`}
                  >
                    {t.nav.contact}
                    <span className={`absolute bottom-0 left-0 h-px bg-olive-green transition-all duration-300 ${currentPath === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                  <LanguageSwitcher />
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                className="text-warm-gray/90 hover:text-olive-green transition-colors duration-300 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
              <svg
                className="w-6 h-6 transition-transform duration-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - Outside nav for proper z-index stacking */}
      <>
        {/* Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div
          className={`mobile-sidebar fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[9999] md:hidden transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'
          }`}
          dir={language}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-natural-wood/10">
              <Link
                to={getLocalizedPath('/', language)}
                className="flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src={saraLogo}
                  alt="Sara Café"
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-warm-gray/70 hover:text-olive-green transition-colors duration-300 p-2"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8 space-y-2">
              {language === 'ar' ? (
                <>
                  <Link
                    to={getLocalizedPath('/', language)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                      currentPath === '/' 
                        ? 'bg-olive-green/10 text-olive-green' 
                        : 'text-warm-gray/90 hover:bg-sand-beige/50 hover:text-olive-green'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-medium text-base">{t.nav.menu}</span>
                  </Link>
                  <a
                    href="#store"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 text-warm-gray/90 hover:bg-sand-beige/50 hover:text-olive-green group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="font-medium text-base">{t.nav.store}</span>
                  </a>
                  <Link
                    to={getLocalizedPath('/about', language)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                      currentPath === '/about' 
                        ? 'bg-olive-green/10 text-olive-green' 
                        : 'text-warm-gray/90 hover:bg-sand-beige/50 hover:text-olive-green'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-base">{t.nav.about}</span>
                  </Link>
                  <Link
                    to={getLocalizedPath('/contact', language)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                      currentPath === '/contact' 
                        ? 'bg-olive-green/10 text-olive-green' 
                        : 'text-warm-gray/90 hover:bg-sand-beige/50 hover:text-olive-green'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-base">{t.nav.contact}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={getLocalizedPath('/', language)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                      currentPath === '/' 
                        ? 'bg-olive-green/10 text-olive-green' 
                        : 'text-warm-gray/90 hover:bg-sand-beige/50 hover:text-olive-green'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-medium text-base">{t.nav.menu}</span>
                  </Link>
                  <a
                    href="#store"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 text-warm-gray/90 hover:bg-sand-beige/50 hover:text-olive-green group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="font-medium text-base">{t.nav.store}</span>
                  </a>
                  <Link
                    to={getLocalizedPath('/about', language)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                      currentPath === '/about' 
                        ? 'bg-olive-green/10 text-olive-green' 
                        : 'text-warm-gray/90 hover:bg-sand-beige/50 hover:text-olive-green'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-base">{t.nav.about}</span>
                  </Link>
                  <Link
                    to={getLocalizedPath('/contact', language)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                      currentPath === '/contact' 
                        ? 'bg-olive-green/10 text-olive-green' 
                        : 'text-warm-gray/90 hover:bg-sand-beige/50 hover:text-olive-green'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-base">{t.nav.contact}</span>
                  </Link>
                </>
              )}
            </nav>

            {/* Language Switcher Footer */}
            <div className="p-6 border-t border-natural-wood/10">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Navbar;

