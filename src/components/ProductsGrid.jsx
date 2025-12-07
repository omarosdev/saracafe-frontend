import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const ProductsGrid = ({ products }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-warm-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-warm-gray/70 text-lg font-light">{t.products.noProducts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ 
                  animationDelay: `${Math.min(index * 0.1, 1)}s`,
                  animationFillMode: 'both'
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;

