import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminTranslations } from '../../translations/adminTranslations';
import { authAPI, isAuthenticated } from '../../services/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const t = adminTranslations.ar.login;

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login(username, password);
      if (data.token) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-sand-beige via-white to-sand-beige/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 watercolor-shadow-lg">
          {/* Logo/Title Section */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-olive-green/10 rounded-2xl mb-4">
              <svg className="w-12 h-12 text-olive-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-olive-green mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
              {t.title}
            </h1>
            <p className="text-warm-gray/70 text-sm" style={{ fontFamily: "'Alexandria', sans-serif" }}>
              {t.subtitle}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                اسم المستخدم
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                style={{ fontFamily: "'Alexandria', sans-serif" }}
                placeholder="admin"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-warm-gray mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                {t.password}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
                style={{ fontFamily: "'Alexandria', sans-serif" }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-olive-green text-white py-3 rounded-xl font-semibold hover:bg-olive-green/90 transition-all hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Zain', sans-serif" }}
            >
              {loading ? t.loading || 'جاري التحميل...' : t.loginButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

