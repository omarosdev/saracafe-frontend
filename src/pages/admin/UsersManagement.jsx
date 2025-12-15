import { useState, useEffect } from 'react';
import { adminTranslations } from '../../translations/adminTranslations';
import { usersAPI } from '../../services/api';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const t = adminTranslations.ar.users;
  const tCommon = adminTranslations.ar.common;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'حدث خطأ في تحميل المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username || '',
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      password: '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.deleteConfirm)) {
      try {
        setLoading(true);
        await usersAPI.delete(id);
        await loadUsers();
      } catch (err) {
        setError(err.message || 'حدث خطأ في حذف المستخدم');
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
      
      if (editingUser) {
        await usersAPI.update(editingUser.id, formData);
      } else {
        await usersAPI.create(formData);
      }
      
      await loadUsers();
      setIsModalOpen(false);
      setFormData({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      });
    } catch (err) {
      setError(err.message || 'حدث خطأ في حفظ المستخدم');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
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
            إدارة مستخدمي النظام
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

      {/* Users Table */}
      {loading && users.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <p className="text-warm-gray/60" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            جاري التحميل...
          </p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <svg className="w-16 h-16 text-warm-gray/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-warm-gray/60" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            {t.noUsers}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-olive-green/5">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-olive-green" style={{ fontFamily: "'Zain', sans-serif" }}>
                    اسم المستخدم
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-olive-green" style={{ fontFamily: "'Zain', sans-serif" }}>
                    البريد الإلكتروني
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-olive-green" style={{ fontFamily: "'Zain', sans-serif" }}>
                    الاسم الكامل
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-olive-green" style={{ fontFamily: "'Zain', sans-serif" }}>
                    {tCommon.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-natural-wood/20">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-sand-beige/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-olive-green/10 rounded-full flex items-center justify-center">
                          <span className="text-olive-green font-semibold" style={{ fontFamily: "'Zain', sans-serif" }}>
                            {user.username?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <span className="font-medium text-warm-gray" style={{ fontFamily: "'Zain', sans-serif" }}>
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-warm-gray/80" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-warm-gray/80" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                        {user.firstName || user.lastName 
                          ? `${user.firstName || ''} ${user.lastName || ''}`.trim() 
                          : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-olive-green hover:bg-olive-green/10 rounded-lg transition-all"
                          title={t.edit}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title={t.delete}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-olive-green mb-6" style={{ fontFamily: "'Zain', sans-serif" }}>
              {editingUser ? t.edit : t.add}
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
                    اسم المستخدم *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    disabled={!!editingUser}
                    className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Alexandria', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                    style={{ fontFamily: "'Alexandria', sans-serif" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                    الاسم الأول
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                    style={{ fontFamily: "'Alexandria', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                    اسم العائلة
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                    style={{ fontFamily: "'Alexandria', sans-serif" }}
                  />
                </div>
              </div>
              <div>
                {!editingUser ? (
                  <div>
                    <label className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                      {t.password} *
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                      style={{ fontFamily: "'Alexandria', sans-serif" }}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                      {t.password} (اتركه فارغاً للاحتفاظ بالكلمة الحالية)
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                      style={{ fontFamily: "'Alexandria', sans-serif" }}
                    />
                  </div>
                )}
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

export default UsersManagement;
