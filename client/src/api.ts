import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Helper function to get the auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const setAuthToken = (token: string) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const register = async (email: string, password: string, username: string) => {
  return api.post('/auth/register', { email, password, username });
};

export const login = async (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};

export const fetchUsers = async () => {
  return api.get('/auth/users', { headers: getAuthHeader() });
};

export const fetchMessages = async (otherUserId: string) => {
  return api.get(`/messages/${otherUserId}`, { headers: getAuthHeader() });
};

export const sendMessage = async (content: string, recipientId: string) => {
  return api.post('/messages', { content, recipientId }, { headers: getAuthHeader() });
};

export default api;