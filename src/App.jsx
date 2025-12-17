import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoriesManagement from './pages/admin/CategoriesManagement';
import ProductsManagement from './pages/admin/ProductsManagement';
import UsersManagement from './pages/admin/UsersManagement';
import ContactsManagement from './pages/admin/ContactsManagement';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { useLanguage } from './context/LanguageContext';
import { getLanguageFromPath } from './utils/routes';

// Component to sync language with URL
const LanguageSync = () => {
  const location = useLocation();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const urlLanguage = getLanguageFromPath(location.pathname);
    if (urlLanguage) {
      setLanguage(urlLanguage);
    }
  }, [location.pathname, setLanguage]);

  return null;
};

// Component to scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <Routes>
      {/* Arabic Routes (default - no prefix) */}
      <Route
        path="/*"
        element={
          <div className="min-h-screen">
            <ScrollToTop />
            <LanguageSync />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* Redirect /en to /en/ */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>
        }
      />
      
      {/* English Routes (with /en prefix) */}
      <Route
        path="/en/*"
        element={
          <div className="min-h-screen">
            <ScrollToTop />
            <LanguageSync />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/en" replace />} />
            </Routes>
            <Footer />
          </div>
        }
      />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="categories" element={<CategoriesManagement />} />
        <Route path="products" element={<ProductsManagement />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="contacts" element={<ContactsManagement />} />
        <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
