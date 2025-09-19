// API Configuration and Base Functions
const API_BASE_URL = 'https://backend.socialmediakampagnen.com/api';

// API Response handler
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// Get stored token
export const getToken = () => {
  return localStorage.getItem('smk_token');
};

// Store token
export const setToken = (token) => {
  localStorage.setItem('smk_token', token);
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem('smk_token');
  localStorage.removeItem('smk_refresh_token');
  localStorage.removeItem('smk_user');
};

// Get stored user
export const getStoredUser = () => {
  const user = localStorage.getItem('smk_user');
  return user ? JSON.parse(user) : null;
};

// Store user
export const setStoredUser = (user) => {
  localStorage.setItem('smk_user', JSON.stringify(user));
};

// API request with authentication
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  return handleResponse(response);
};

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Logout user
  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  // Refresh token
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('smk_refresh_token');
    return apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  // Change password
  changePassword: async (passwordData) => {
    return apiRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  },
};

// User API calls
export const userAPI = {
  // Get current user profile
  getProfile: async () => {
    return apiRequest('/users/me');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiRequest('/users/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Get user sessions
  getSessions: async () => {
    return apiRequest('/users/sessions');
  },

  // Revoke session
  revokeSession: async (sessionId) => {
    return apiRequest(`/users/sessions/${sessionId}`, {
      method: 'DELETE',
    });
  },
};

// Admin API calls
export const adminAPI = {
  // Get all users (admin only)
  getUsers: async (page = 1, limit = 10) => {
    return apiRequest(`/users?page=${page}&limit=${limit}`);
  },

  // Update user role (admin only)
  updateUserRole: async (userId, role) => {
    return apiRequest(`/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiRequest('/health');
};

export default {
  authAPI,
  userAPI,
  adminAPI,
  healthCheck,
  getToken,
  setToken,
  removeToken,
  getStoredUser,
  setStoredUser,
};
