import axios from 'axios';
import refreshToken from './api/refresToken';

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `bearer ${localStorage.getItem('access_token') || ''}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken(localStorage.getItem('refresh_token') || '');
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosApiInstance;
