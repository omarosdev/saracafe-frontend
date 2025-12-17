import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const Categories = ({ categories, activeCategory, onCategoryChange }) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const getCategoryDisplayName = (category) => {
    // Handle "All" option
    if (category === 'All' || category === 'all') {
      return t.categories.all;
    }
    
    // Handle category objects from API
    if (typeof category === 'object' && category !== null) {
      return language === 'ar' ? category.nameAr : category.nameEn;
    }
    
    // Fallback for string categories
    return category;
  };

  const getCategoryKey = (category) => {
    if (category === 'All' || category === 'all') {
      return 'All';
    }
    if (typeof category === 'object' && category !== null) {
      return category.id;
    }
    return category;
  };

  const isActive = (category) => {
    if (activeCategory === 'All' && (category === 'All' || category === 'all')) {
      return true;
    }
    if (typeof category === 'object' && typeof activeCategory === 'object') {
      return category.id === activeCategory.id;
    }
    if (typeof category === 'object') {
      return category.id === activeCategory;
    }
    return category === activeCategory;
  };

  return (
    <div className="py-16 bg-gradient-to-b from-sand-beige via-sand-beige/95 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 
            className="text-3xl md:text-4xl font-normal text-olive-green mb-3"
            style={{ 
              fontFamily: language === 'ar' 
                ? "'Zain', sans-serif" 
                : "'Playfair Display', serif",
              fontWeight: language === 'ar' ? 600 : 400
            }}
          >
            {t.categories.title}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-natural-wood/40 to-transparent mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-3 md:gap-4">
          {categories.map((category, index) => {
            const displayName = getCategoryDisplayName(category);
            const categoryKey = getCategoryKey(category);
            const active = isActive(category);
            
            return (
              <button
                key={categoryKey}
                onClick={() => onCategoryChange(category)}
                className={`group relative w-full md:w-auto px-7 py-3.5 rounded-full font-medium transition-all duration-500 overflow-hidden ${
                  active
                    ? 'bg-olive-green text-sand-beige shadow-lg shadow-olive-green/20 md:scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-warm-gray border border-natural-wood/20 hover:border-olive-green/40 hover:bg-white hover:shadow-md md:hover:scale-[1.02]'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <span className="relative z-10 tracking-wide">{displayName}</span>
                
                {/* Active state background animation */}
                {active && (
                  <span className="absolute inset-0 bg-gradient-to-r from-olive-green via-olive-green/90 to-olive-green opacity-100"></span>
                )}
                
                {/* Hover shine effect */}
                <span className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${language === 'ar' ? 'translate-x-[100%] group-hover:translate-x-[-100%]' : 'translate-x-[-100%] group-hover:translate-x-[100%]'} transition-transform duration-1000`}></span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
