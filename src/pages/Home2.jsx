import { useState, useEffect } from 'react';
import Hero2 from '../components/Hero2';
import Categories from '../components/Categories';
import ProductsGrid from '../components/ProductsGrid';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { productsAPI, categoriesAPI } from '../services/api';
import { translations } from '../translations/translations';

const Home2 = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      
      // Filter only active products
      const activeProducts = productsData.filter((p) => p.isActive);
      setProducts(activeProducts);
      
      // Filter only active categories and add "All" option
      const activeCategories = categoriesData.filter((c) => c.isActive);
      setCategories(['All', ...activeCategories]);
    } catch (err) {
      setError(err.message || 'حدث خطأ في تحميل البيانات');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => {
          // Match by category ID or category name
          const categoryId = typeof activeCategory === 'object' ? activeCategory.id : null;
          const categoryName = typeof activeCategory === 'object' ? activeCategory.nameEn : activeCategory;
          return product.categoryId === categoryId || product.categoryNameEn === categoryName;
        });

  if (loading) {
    return (
      <>
        <Hero2 />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-warm-gray/60" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            جاري التحميل...
          </p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Hero2 />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-600" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            {error}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={t.seo.home.title}
        description={t.seo.home.description}
        keywords={t.seo.home.keywords}
        image="/sara-logo.png"
        type="website"
      />
      <Hero2 />
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProductsGrid products={filteredProducts} />
    </>
  );
};

export default Home2;

