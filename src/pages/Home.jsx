import { useState } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ProductsGrid from '../components/ProductsGrid';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

// Sample product data structure
const getProducts = (language) => {
  const t = translations[language].productsData;
  return [
    {
      id: 1,
      name: t.espresso.name,
      category: 'Coffee',
      description: t.espresso.description,
      calories: 5,
      price: 3.50,
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 2,
      name: t.cappuccino.name,
      category: 'Coffee',
      description: t.cappuccino.description,
      calories: 120,
      price: 4.75,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 3,
      name: t.latte.name,
      category: 'Coffee',
      description: t.latte.description,
      calories: 150,
      price: 5.00,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 4,
      name: t.mocha.name,
      category: 'Coffee',
      description: t.mocha.description,
      calories: 290,
      price: 5.50,
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 5,
      name: t.matchaLatte.name,
      category: 'Drinks',
      description: t.matchaLatte.description,
      calories: 180,
      price: 5.25,
      image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 6,
      name: t.chaiTea.name,
      category: 'Drinks',
      description: t.chaiTea.description,
      calories: 60,
      price: 4.50,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 7,
      name: t.orangeJuice.name,
      category: 'Drinks',
      description: t.orangeJuice.description,
      calories: 110,
      price: 4.00,
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 8,
      name: t.croissant.name,
      category: 'Breakfast',
      description: t.croissant.description,
      calories: 230,
      price: 3.75,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 9,
      name: t.avocadoToast.name,
      category: 'Breakfast',
      description: t.avocadoToast.description,
      calories: 320,
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 10,
      name: t.frenchToast.name,
      category: 'Breakfast',
      description: t.frenchToast.description,
      calories: 450,
      price: 9.00,
      image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 11,
      name: t.chocolateCake.name,
      category: 'Desserts',
      description: t.chocolateCake.description,
      calories: 380,
      price: 6.50,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 12,
      name: t.tiramisu.name,
      category: 'Desserts',
      description: t.tiramisu.description,
      calories: 420,
      price: 7.00,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 13,
      name: t.lemonTart.name,
      category: 'Desserts',
      description: t.lemonTart.description,
      calories: 280,
      price: 6.00,
      image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 14,
      name: t.macarons.name,
      category: 'Desserts',
      description: t.macarons.description,
      calories: 240,
      price: 8.00,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop&q=80',
    },
  ];
};

const Home = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const allProducts = getProducts(language);
  
  const categories = ['All', 'Coffee', 'Drinks', 'Breakfast', 'Desserts'];

  const filteredProducts =
    activeCategory === 'All'
      ? allProducts
      : allProducts.filter((product) => product.category === activeCategory);

  return (
    <>
      <Hero />
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProductsGrid products={filteredProducts} />
    </>
  );
};

export default Home;

