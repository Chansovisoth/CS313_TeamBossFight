import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiClient };


export const setupInterceptors = (auth, navigate) => {
  // TODO: Implement API interceptors here
  // This function sets up request/response interceptors for API calls
  console.log('API interceptors setup placeholder');
};
