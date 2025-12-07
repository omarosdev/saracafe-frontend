import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const ProductCard = ({ product }) => {
  const { language } = useLanguage();
  const t = translations[language];

  // Map category keys to translated names
  const categoryMap = {
    'All': t.categories.all,
    'Coffee': t.categories.coffee,
    'Drinks': t.categories.drinks,
    'Breakfast': t.categories.breakfast,
    'Desserts': t.categories.desserts,
  };

  const getCategoryDisplayName = (category) => {
    return categoryMap[category] || category;
  };

  return (
    <div className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover-lift border border-natural-wood/10">
      {/* Product Image */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-sand-beige via-sand-beige/80 to-natural-wood/15">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center elegant-gradient">
            <div className="text-7xl opacity-15 group-hover:opacity-20 transition-opacity duration-500">☕</div>
          </div>
        )}
        
        {/* Elegant Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-olive-green/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Watercolor Accent */}
        <div className={`absolute top-6 ${language === 'ar' ? 'left-6' : 'right-6'} w-20 h-20 opacity-8 group-hover:opacity-12 transition-opacity duration-500`}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-olive-green">
            <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.2" />
            <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.1" />
          </svg>
        </div>
        
        {/* Category Badge */}
        <div className={`absolute top-6 ${language === 'ar' ? 'right-6' : 'left-6'}`}>
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-olive-green text-xs font-medium rounded-full border border-olive-green/10">
            {getCategoryDisplayName(product.category)}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-7 bg-white">
        <h3 
          className="text-2xl font-normal text-olive-green mb-3 leading-tight"
          style={{ 
            fontFamily: language === 'ar' 
              ? "'Zain', sans-serif" 
              : "'Playfair Display', serif",
            fontWeight: language === 'ar' ? 600 : 400
          }}
        >
          {product.name}
        </h3>
        <p className="text-warm-gray/80 text-sm mb-6 leading-relaxed font-light min-h-[3rem]">
          {product.description}
        </p>
        
        <div className={`flex items-center justify-between pt-5 border-t border-natural-wood/15 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-warm-gray/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm text-warm-gray/70 font-light">
              {product.calories} {t.products.calories}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span 
              className="text-2xl font-medium text-olive-green"
              style={{ 
                fontFamily: language === 'ar' 
                  ? "'Zain', sans-serif" 
                  : "'Playfair Display', serif",
                fontWeight: language === 'ar' ? 600 : 400
              }}
            >
              {language === 'ar' ? `${product.price.toFixed(2)} ﷼` : `SAR ${product.price.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Organic Illustration Accent */}
      <div className={`absolute bottom-3 ${language === 'ar' ? 'right-3' : 'left-3'} w-10 h-10 opacity-4 group-hover:opacity-6 transition-opacity duration-500`}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-natural-wood">
          <path
            d="M50,20 Q30,40 50,60 Q70,40 50,20"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
        <div className={`absolute -inset-full top-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent ${language === 'ar' ? 'group-hover:translate-x-[-100%]' : 'group-hover:translate-x-full'} transition-transform duration-1000`}></div>
      </div>
    </div>
  );
};

export default ProductCard;

