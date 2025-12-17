import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath, getPathWithoutLanguage } from '../utils/routes';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/sara-logo.png',
  type = 'website',
  noindex = false 
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  const currentPath = getPathWithoutLanguage(location.pathname);
  
  // Base URL
  const baseUrl = 'https://saracafe.sa';
  
  // Get current URL
  const currentUrl = `${baseUrl}${getLocalizedPath(currentPath, language)}`;
  
  // Get alternate URLs
  const arUrl = `${baseUrl}${getLocalizedPath(currentPath, 'ar')}`;
  const enUrl = `${baseUrl}${getLocalizedPath(currentPath, 'en')}`;
  
  // Full title with site name
  const fullTitle = language === 'ar' 
    ? `${title} | مقهى سارة`
    : `${title} | Sara Café`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update or create link tags
    const updateLinkTag = (rel, href, attributes = {}) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (attributes.hreflang) {
        link = document.querySelector(`link[rel="${rel}"][hreflang="${attributes.hreflang}"]`);
      }
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        Object.entries(attributes).forEach(([key, value]) => {
          if (value) link.setAttribute(key, value);
        });
        document.head.appendChild(link);
      }
      if (href) link.setAttribute('href', href);
    };

    // Primary Meta Tags
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('author', 'Sara Café');
    updateMetaTag('theme-color', '#65846F');

    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', `${baseUrl}${image}`, true);
    updateMetaTag('og:locale', language === 'ar' ? 'ar_SA' : 'en_US', true);
    updateMetaTag('og:site_name', 'Sara Café', true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', currentUrl, true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', `${baseUrl}${image}`, true);

    // Canonical URL
    updateLinkTag('canonical', currentUrl);

    // Language Alternates
    updateLinkTag('alternate', arUrl, { hreflang: 'ar' });
    updateLinkTag('alternate', enUrl, { hreflang: 'en' });
    updateLinkTag('alternate', arUrl, { hreflang: 'x-default' });

    // Update HTML lang attribute
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    // Get page name for breadcrumbs
    const getPageName = () => {
      if (currentPath === '/') {
        return language === 'ar' ? 'الرئيسية' : 'Home';
      } else if (currentPath === '/about') {
        return language === 'ar' ? 'من نحن' : 'About';
      } else if (currentPath === '/contact') {
        return language === 'ar' ? 'اتصل بنا' : 'Contact';
      }
      return '';
    };

    // Structured Data (JSON-LD) - Restaurant/LocalBusiness
    const restaurantData = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: language === 'ar' ? 'مقهى سارة' : 'Sara Café',
      alternateName: language === 'ar' ? 'Sara Café' : 'مقهى سارة',
      description: description,
      url: currentUrl,
      logo: `${baseUrl}/sara-logo.png`,
      image: `${baseUrl}${image}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Al Batarji Street',
        addressLocality: 'Jeddah',
        addressRegion: 'Makkah',
        addressCountry: 'SA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '21.4858',
        longitude: '39.1925',
      },
      telephone: '+966564620992',
      priceRange: '$$',
      servesCuisine: language === 'ar' 
        ? 'عالمي, صحي, إفطار, برانش'
        : 'International, Healthy, Breakfast, Brunch',
      openingHours: 'Mo-Su 07:00-23:00',
      founder: {
        '@type': 'Person',
        name: 'Sara Mahjoub',
      },
      foundingDate: '2014-02-21',
      sameAs: [],
    };

    // BreadcrumbList structured data
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: language === 'ar' ? 'الرئيسية' : 'Home',
          item: `${baseUrl}${getLocalizedPath('/', language)}`,
        },
        ...(currentPath !== '/' ? [{
          '@type': 'ListItem',
          position: 2,
          name: getPageName(),
          item: currentUrl,
        }] : []),
      ],
    };

    // WebSite structured data
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: language === 'ar' ? 'مقهى سارة' : 'Sara Café',
      alternateName: language === 'ar' ? 'Sara Café' : 'مقهى سارة',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}${getLocalizedPath('/', language)}?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: [language === 'ar' ? 'ar-SA' : 'en-US'],
    };

    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add restaurant structured data
    const restaurantScript = document.createElement('script');
    restaurantScript.type = 'application/ld+json';
    restaurantScript.text = JSON.stringify(restaurantData);
    document.head.appendChild(restaurantScript);

    // Add breadcrumb structured data
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbData);
    document.head.appendChild(breadcrumbScript);

    // Add website structured data (only on home page)
    if (currentPath === '/') {
      const websiteScript = document.createElement('script');
      websiteScript.type = 'application/ld+json';
      websiteScript.text = JSON.stringify(websiteData);
      document.head.appendChild(websiteScript);
    }

    // Cleanup function
    return () => {
      // Don't remove meta tags on unmount as they should persist
    };
  }, [title, description, keywords, image, type, currentUrl, arUrl, enUrl, fullTitle, language, noindex, baseUrl, currentPath]);

  return null;
};

export default SEO;

