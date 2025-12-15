// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5064';
const API_PREFIX = '/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

// Set auth token
const setAuthToken = (token) => {
  localStorage.setItem('adminToken', token);
};

// Remove auth token
const removeAuthToken = () => {
  localStorage.removeItem('adminToken');
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!getAuthToken();
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${API_PREFIX}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    ...options.headers,
  };

  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle FormData (for file uploads)
  if (options.body instanceof FormData) {
    // Don't set Content-Type for FormData, browser will set it with boundary
    delete headers['Content-Type'];
  } else if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    // Parse JSON response
    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      const error = typeof data === 'string' ? data : data.title || 'An error occurred';
      throw new Error(error);
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Could not connect to the server');
    }
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (username, password) => {
    const data = await apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (data.token) {
      setAuthToken(data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout: () => {
    removeAuthToken();
    localStorage.removeItem('adminUser');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    return apiRequest('/categories');
  },

  getById: async (id) => {
    return apiRequest(`/categories/${id}`);
  },

  create: async (categoryData) => {
    return apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify({
        nameAr: categoryData.nameAr,
        nameEn: categoryData.nameEn,
        isActive: categoryData.isActive !== undefined ? categoryData.isActive : true,
      }),
    });
  },

  update: async (id, categoryData) => {
    return apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        nameAr: categoryData.nameAr,
        nameEn: categoryData.nameEn,
        isActive: categoryData.isActive !== undefined ? categoryData.isActive : true,
      }),
    });
  },

  delete: async (id) => {
    return apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// Products API
export const productsAPI = {
  getAll: async (categoryId = null) => {
    const endpoint = categoryId ? `/products?categoryId=${categoryId}` : '/products';
    return apiRequest(endpoint);
  },

  getById: async (id) => {
    return apiRequest(`/products/${id}`);
  },

  getByCategory: async (categoryId) => {
    return apiRequest(`/products/category/${categoryId}`);
  },

  create: async (productData, imageFile = null) => {
    const formData = new FormData();
    formData.append('nameAr', productData.nameAr);
    formData.append('nameEn', productData.nameEn);
    formData.append('categoryId', productData.categoryId);
    formData.append('isActive', productData.isActive !== undefined ? productData.isActive : true);
    
    if (productData.descriptionAr) {
      formData.append('descriptionAr', productData.descriptionAr);
    }
    if (productData.descriptionEn) {
      formData.append('descriptionEn', productData.descriptionEn);
    }
    if (productData.price !== undefined && productData.price !== null && productData.price !== '') {
      formData.append('price', productData.price);
    }
    if (productData.calories) {
      formData.append('calories', productData.calories);
    }
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    return apiRequest('/products', {
      method: 'POST',
      body: formData,
    });
  },

  update: async (id, productData, imageFile = null) => {
    const formData = new FormData();
    formData.append('nameAr', productData.nameAr);
    formData.append('nameEn', productData.nameEn);
    formData.append('categoryId', productData.categoryId);
    formData.append('isActive', productData.isActive !== undefined ? productData.isActive : true);
    
    if (productData.descriptionAr) {
      formData.append('descriptionAr', productData.descriptionAr);
    }
    if (productData.descriptionEn) {
      formData.append('descriptionEn', productData.descriptionEn);
    }
    if (productData.price !== undefined && productData.price !== null && productData.price !== '') {
      formData.append('price', productData.price);
    }
    if (productData.calories) {
      formData.append('calories', productData.calories);
    }
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },

  uploadImage: async (id, imageFile) => {
    const formData = new FormData();
    formData.append('imageFile', imageFile);

    return apiRequest(`/products/${id}/image`, {
      method: 'POST',
      body: formData,
    });
  },

  delete: async (id) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Users API
export const usersAPI = {
  getAll: async () => {
    return apiRequest('/users');
  },

  getById: async (id) => {
    return apiRequest(`/users/${id}`);
  },

  create: async (userData) => {
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
      }),
    });
  },

  update: async (id, userData) => {
    const body = {
      email: userData.email,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
    };
    
    if (userData.password) {
      body.password = userData.password;
    }

    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete: async (id) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Contacts API
export const contactsAPI = {
  create: async (contactData) => {
    return apiRequest('/contacts', {
      method: 'POST',
      body: JSON.stringify({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || null,
        message: contactData.message,
      }),
    });
  },

  getAll: async () => {
    return apiRequest('/contacts');
  },

  getById: async (id) => {
    return apiRequest(`/contacts/${id}`);
  },
};

// Export auth helpers
export { getAuthToken, setAuthToken, removeAuthToken, isAuthenticated };

