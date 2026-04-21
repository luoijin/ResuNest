// src/utils/auth.js
const STORAGE_KEY = 'resunest_user';

export const mockLogin = (email) => {
  if (!email || email.trim() === '') {
    return false;
  }
  localStorage.setItem(STORAGE_KEY, email.trim());
  return true;
};

export const mockLogout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = () => {
  return localStorage.getItem(STORAGE_KEY);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(STORAGE_KEY);
};