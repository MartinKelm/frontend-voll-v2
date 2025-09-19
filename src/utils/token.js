// JWT Token Management Utilities

/**
 * Decode JWT token payload without verification
 * @param {string} token - JWT token
 * @returns {object|null} - Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if JWT token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if expired, false if valid
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

/**
 * Get token expiration time
 * @param {string} token - JWT token
 * @returns {Date|null} - Expiration date or null if invalid
 */
export const getTokenExpiration = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return null;
    
    return new Date(decoded.exp * 1000);
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
};

/**
 * Get user ID from token
 * @param {string} token - JWT token
 * @returns {string|null} - User ID or null if invalid
 */
export const getUserIdFromToken = (token) => {
  try {
    const decoded = decodeToken(token);
    return decoded?.userId || decoded?.sub || null;
  } catch (error) {
    console.error('Error getting user ID from token:', error);
    return null;
  }
};

/**
 * Get user role from token
 * @param {string} token - JWT token
 * @returns {string|null} - User role or null if invalid
 */
export const getUserRoleFromToken = (token) => {
  try {
    const decoded = decodeToken(token);
    return decoded?.role || null;
  } catch (error) {
    console.error('Error getting user role from token:', error);
    return null;
  }
};

/**
 * Check if token will expire soon (within specified minutes)
 * @param {string} token - JWT token
 * @param {number} minutesThreshold - Minutes before expiration to consider "soon"
 * @returns {boolean} - True if expiring soon
 */
export const isTokenExpiringSoon = (token, minutesThreshold = 5) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    const thresholdTime = currentTime + (minutesThreshold * 60);
    
    return decoded.exp < thresholdTime;
  } catch (error) {
    console.error('Error checking if token expiring soon:', error);
    return true;
  }
};

/**
 * Format token expiration time for display
 * @param {string} token - JWT token
 * @returns {string} - Formatted expiration time or 'Invalid token'
 */
export const formatTokenExpiration = (token) => {
  try {
    const expiration = getTokenExpiration(token);
    if (!expiration) return 'Invalid token';
    
    return expiration.toLocaleString();
  } catch (error) {
    console.error('Error formatting token expiration:', error);
    return 'Invalid token';
  }
};

/**
 * Get time until token expires
 * @param {string} token - JWT token
 * @returns {object|null} - Object with days, hours, minutes, seconds or null if invalid
 */
export const getTimeUntilExpiration = (token) => {
  try {
    const expiration = getTokenExpiration(token);
    if (!expiration) return null;
    
    const now = new Date();
    const diff = expiration.getTime() - now.getTime();
    
    if (diff <= 0) return { expired: true };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds, expired: false };
  } catch (error) {
    console.error('Error getting time until expiration:', error);
    return null;
  }
};

/**
 * Validate token structure (basic validation)
 * @param {string} token - JWT token
 * @returns {boolean} - True if token has valid structure
 */
export const isValidTokenStructure = (token) => {
  try {
    if (!token || typeof token !== 'string') return false;
    
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Try to decode each part
    parts.forEach(part => {
      atob(part.replace(/-/g, '+').replace(/_/g, '/'));
    });
    
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Storage keys for tokens
 */
export const TOKEN_STORAGE_KEYS = {
  ACCESS_TOKEN: 'smk_token',
  REFRESH_TOKEN: 'smk_refresh_token',
  USER_DATA: 'smk_user',
};

/**
 * Clear all authentication data from storage
 */
export const clearAuthStorage = () => {
  Object.values(TOKEN_STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

/**
 * Get all stored authentication data
 * @returns {object} - Object with token, refreshToken, and user data
 */
export const getStoredAuthData = () => {
  try {
    return {
      token: localStorage.getItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN),
      refreshToken: localStorage.getItem(TOKEN_STORAGE_KEYS.REFRESH_TOKEN),
      user: JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEYS.USER_DATA) || 'null'),
    };
  } catch (error) {
    console.error('Error getting stored auth data:', error);
    return { token: null, refreshToken: null, user: null };
  }
};

export default {
  decodeToken,
  isTokenExpired,
  getTokenExpiration,
  getUserIdFromToken,
  getUserRoleFromToken,
  isTokenExpiringSoon,
  formatTokenExpiration,
  getTimeUntilExpiration,
  isValidTokenStructure,
  TOKEN_STORAGE_KEYS,
  clearAuthStorage,
  getStoredAuthData,
};
