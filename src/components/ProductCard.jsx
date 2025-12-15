import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const ProductCard = ({ product }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5064';

  // Get product name and description based on language
  const productName = language === 'ar' ? product.nameAr : product.nameEn;
  const productDescription = language === 'ar' ? product.descriptionAr : product.descriptionEn;
  const categoryName = language === 'ar' ? product.categoryNameAr : product.categoryNameEn;

  // Build image URL
  const imageUrl = product.imageUrl 
    ? `${API_BASE_URL}${product.imageUrl}` 
    : null;

  return (
    <div className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover-lift border border-natural-wood/10">
      {/* Product Image */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-sand-beige via-sand-beige/80 to-natural-wood/15">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`w-full h-full flex items-center justify-center elegant-gradient ${imageUrl ? 'hidden' : ''}`}>
          <div className="text-7xl opacity-15 group-hover:opacity-20 transition-opacity duration-500">☕</div>
        </div>
        
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
        {categoryName && (
          <div className={`absolute top-6 ${language === 'ar' ? 'right-6' : 'left-6'}`}>
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-olive-green text-xs font-medium rounded-full border border-olive-green/10">
              {categoryName}
            </span>
          </div>
        )}
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
          {productName}
        </h3>
        {productDescription && (
          <p className="text-warm-gray/80 text-sm mb-4 leading-relaxed font-light min-h-[3rem]">
            {productDescription}
          </p>
        )}
        {/* Price and Calories */}
        {(product.price !== undefined && product.price !== null) || product.calories ? (
          <div className="flex items-center justify-between pt-4 border-t border-natural-wood/10">
            {product.price !== undefined && product.price !== null ? (
              <div className="flex items-center gap-1">
                <span 
                  className="text-xl font-semibold text-olive-green"
                  style={{ fontFamily: language === 'ar' ? "'Zain', sans-serif" : "'Playfair Display', serif" }}
                >
                  {product.price}
                </span>
                <span 
                  className="text-lg text-olive-green/80"
                  style={{ fontFamily: language === 'ar' ? "'Zain', sans-serif" : "'Playfair Display', serif" }}
                >
                  {language === 'ar' ? '﷼' : 'SAR'}
                </span>
              </div>
            ) : (
              <div></div>
            )}
            {product.calories ? (
              <div className="flex items-center gap-1.5">
                <svg 
                  className="w-4 h-4 text-warm-gray/70" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C12.33 3.23 10.91 4.08 10 5.43C9.16 4.5 8.12 3.78 7 3.28C7.24 5.67 6.15 7.96 4.5 9.5C3.58 10.45 2.95 11.64 3 12.86C3.05 14.08 3.78 15.22 4.5 16.05C5.22 16.88 6.11 17.5 7 18C8.5 18.9 10.23 19.1 11.5 18.5C12.77 17.9 13.5 16.5 14 15.5C14.5 14.5 15 13.5 15.5 12.5C16 11.5 16.5 11.2 17.66 11.2Z" />
                </svg>
                <span 
                  className="text-sm text-warm-gray/70"
                  style={{ fontFamily: "'Alexandria', sans-serif" }}
                >
                  {product.calories}
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : null}
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
