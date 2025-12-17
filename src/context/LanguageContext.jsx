import { createContext, useContext, useState, useEffect } from 'react';
import { getLanguageFromPath } from '../utils/routes';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Detect language from URL path on initial load
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlLanguage = getLanguageFromPath(window.location.pathname);
      return urlLanguage || localStorage.getItem('language') || 'ar';
    }
    return localStorage.getItem('language') || 'ar';
  });

  // Update language when URL changes (for browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const urlLanguage = getLanguageFromPath(window.location.pathname);
      if (urlLanguage && urlLanguage !== language) {
        setLanguage(urlLanguage);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  useEffect(() => {
    // Update HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

