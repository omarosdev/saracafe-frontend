/**
 * Get language-prefixed route
 * Arabic routes: /, /about, /contact (no prefix)
 * English routes: /en, /en/about, /en/contact
 */
export const getLocalizedPath = (path, language) => {
  // Remove leading slash for consistency
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Admin routes don't need language prefix
  if (cleanPath.startsWith('admin')) {
    return `/${cleanPath}`;
  }
  
  // English routes get /en prefix
  if (language === 'en') {
    return cleanPath ? `/en/${cleanPath}` : '/en';
  }
  
  // Arabic routes (default) - no prefix
  return cleanPath ? `/${cleanPath}` : '/';
};

/**
 * Extract language from pathname
 */
export const getLanguageFromPath = (pathname) => {
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'ar'; // Default to Arabic
};

/**
 * Get path without language prefix
 */
export const getPathWithoutLanguage = (pathname) => {
  if (pathname.startsWith('/en')) {
    return pathname.replace('/en', '') || '/';
  }
  return pathname;
};

