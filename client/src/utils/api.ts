import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7000/api/v1/', // ✅ Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or sessionStorage, or AsyncStorage in React Native
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
