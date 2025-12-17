import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath, getPathWithoutLanguage } from '../utils/routes';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    const currentPath = getPathWithoutLanguage(location.pathname);
    const newPath = getLocalizedPath(currentPath, newLanguage);
    setLanguage(newLanguage);
    navigate(newPath);
  };

  return (
    <button
      onClick={handleToggle}
      className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-natural-wood/20 hover:border-olive-green/40 hover:bg-white transition-all duration-300 hover:shadow-md overflow-hidden"
      aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <span className="relative z-10 text-sm font-medium text-warm-gray group-hover:text-olive-green transition-colors duration-300">
        {language === 'ar' ? 'EN' : 'AR'}
      </span>
      <svg
        className="relative z-10 w-4 h-4 text-warm-gray/60 group-hover:text-olive-green transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      {/* Hover shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
    </button>
  );
};

export default LanguageSwitcher;

