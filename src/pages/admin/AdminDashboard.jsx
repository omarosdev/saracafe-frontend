import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminTranslations } from '../../translations/adminTranslations';
import { categoriesAPI, productsAPI, usersAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const t = adminTranslations.ar;

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [categories, products, users] = await Promise.all([
        categoriesAPI.getAll(),
        productsAPI.getAll(),
        usersAPI.getAll(),
      ]);

      setStats({
        categories: categories.length,
        products: products.length,
        users: users.length,
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: t.dashboard.stats.categories,
      value: stats.categories,
      icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
      color: 'bg-blue-500',
      link: '/admin/categories',
    },
    {
      title: t.dashboard.stats.products,
      value: stats.products,
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      color: 'bg-olive-green',
      link: '/admin/products',
    },
    {
      title: t.dashboard.stats.users,
      value: stats.users,
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'bg-purple-500',
      link: '/admin/users',
    },
  ];

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-olive-green mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
          {t.dashboard.title}
        </h1>
        <p className="text-warm-gray/70" style={{ fontFamily: "'Alexandria', sans-serif" }}>
          مرحباً بك في لوحة التحكم
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white rounded-2xl p-6 shadow-lg hover-lift group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-xl text-white`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <svg className="w-5 h-5 text-warm-gray/40 group-hover:text-olive-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-warm-gray mb-1" style={{ fontFamily: "'Zain', sans-serif" }}>
              {card.value}
            </h3>
            <p className="text-sm text-warm-gray/70" style={{ fontFamily: "'Alexandria', sans-serif" }}>
              {card.title}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-olive-green mb-4" style={{ fontFamily: "'Zain', sans-serif" }}>
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/categories"
            className="flex items-center space-x-3 space-x-reverse p-4 border border-natural-wood/20 rounded-xl hover:bg-olive-green/5 hover:border-olive-green/50 transition-all"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-medium text-warm-gray" style={{ fontFamily: "'Zain', sans-serif" }}>
              إضافة فئة جديدة
            </span>
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center space-x-3 space-x-reverse p-4 border border-natural-wood/20 rounded-xl hover:bg-olive-green/5 hover:border-olive-green/50 transition-all"
          >
            <div className="p-2 bg-olive-green/10 rounded-lg">
              <svg className="w-5 h-5 text-olive-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-medium text-warm-gray" style={{ fontFamily: "'Zain', sans-serif" }}>
              إضافة منتج جديد
            </span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center space-x-3 space-x-reverse p-4 border border-natural-wood/20 rounded-xl hover:bg-olive-green/5 hover:border-olive-green/50 transition-all"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-medium text-warm-gray" style={{ fontFamily: "'Zain', sans-serif" }}>
              إضافة مستخدم جديد
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

