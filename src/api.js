import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiClient };


export const setupInterceptors = (auth, navigate) => {
  // Request interceptor to add auth token to headers
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle auth errors
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        delete apiClient.defaults.headers.common["Authorization"];
        if (auth?.logout) {
          auth.logout();
        }
        if (navigate) {
          navigate('/auth');
        }
      }
      return Promise.reject(error);
    }
  );
};
