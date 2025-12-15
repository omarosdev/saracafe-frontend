import { useState, useEffect } from 'react';
import { adminTranslations } from '../../translations/adminTranslations';
import { categoriesAPI } from '../../services/api';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    isActive: true,
  });
  const t = adminTranslations.ar.categories;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesAPI.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'حدث خطأ في تحميل الفئات');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ nameAr: '', nameEn: '', descriptionAr: '', descriptionEn: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      nameAr: category.nameAr || '',
      nameEn: category.nameEn || '',
      isActive: category.isActive !== undefined ? category.isActive : true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.deleteConfirm)) {
      try {
        setLoading(true);
        await categoriesAPI.delete(id);
        await loadCategories();
      } catch (err) {
        setError(err.message || 'حدث خطأ في حذف الفئة');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      if (editingCategory) {
        await categoriesAPI.update(editingCategory.id, formData);
      } else {
        await categoriesAPI.create(formData);
      }
      
      await loadCategories();
      setIsModalOpen(false);
      setFormData({ nameAr: '', nameEn: '', isActive: true });
    } catch (err) {
      setError(err.message || 'حدث خطأ في حفظ الفئة');
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.nameAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.nameEn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-olive-green mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
            {t.title}
          </h1>
          <p className="text-warm-gray/70" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            إدارة فئات القائمة
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 md:mt-0 bg-olive-green text-white px-6 py-3 rounded-xl font-semibold hover:bg-olive-green/90 transition-all hover-lift"
          style={{ fontFamily: "'Zain', sans-serif" }}
        >
          + {t.add}
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.search}
            className="w-full px-4 py-3 pr-12 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
            style={{ fontFamily: "'Alexandria', sans-serif" }}
          />
          <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm" style={{ fontFamily: "'Alexandria', sans-serif" }}>
          {error}
        </div>
      )}

      {/* Categories List */}
      {loading && categories.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <p className="text-warm-gray/60" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            جاري التحميل...
          </p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <svg className="w-16 h-16 text-warm-gray/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <p className="text-warm-gray/60" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            {t.noCategories}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-olive-green mb-1" style={{ fontFamily: "'Zain', sans-serif" }}>
                    {category.nameAr}
                  </h3>
                  <p className="text-sm text-warm-gray/60 mb-2" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                    {category.nameEn}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-lg ${
                    category.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`} style={{ fontFamily: "'Zain', sans-serif" }}>
                    {category.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse pt-4 border-t border-natural-wood/20">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 px-4 py-2 bg-olive-green/10 text-olive-green rounded-lg hover:bg-olive-green/20 transition-all text-sm font-medium"
                  style={{ fontFamily: "'Zain', sans-serif" }}
                >
                  {t.edit}
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-olive-green mb-6" style={{ fontFamily: "'Zain', sans-serif" }}>
              {editingCategory ? t.edit : t.add}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                    {t.nameAr} *
                  </label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                    style={{ fontFamily: "'Alexandria', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                    {t.nameEn} *
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                    style={{ fontFamily: "'Alexandria', sans-serif" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                  الحالة
                </label>
                <select
                  value={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                  className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                  style={{ fontFamily: "'Alexandria', sans-serif" }}
                >
                  <option value={true}>نشط</option>
                  <option value={false}>غير نشط</option>
                </select>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-olive-green text-white px-6 py-3 rounded-xl font-semibold hover:bg-olive-green/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Zain', sans-serif" }}
                >
                  {loading ? 'جاري الحفظ...' : t.save}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-natural-wood/30 text-warm-gray rounded-xl hover:bg-sand-beige transition-all"
                  style={{ fontFamily: "'Zain', sans-serif" }}
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;

