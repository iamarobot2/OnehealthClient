import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://onehealth-server.onrender.com', 
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },(error) => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,async (error) => {
    const { config, response } = error;
    if (response && response.status === 401) {
      const originalRequest = config;
      if (originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/signup')) {
        return Promise.reject(error);
      }
       try {
         const refreshResponse = await api.post('/auth/refresh', {}, { withCredentials: true });
         if (refreshResponse.status === 200) {
           return api.request(originalRequest);
         }
       } catch (refreshError) {
         Cookies.remove('accessToken');
         Cookies.remove('refreshToken');
         return Promise.reject(refreshError);
       }
    }
    return Promise.reject(error);
  }
);

export default api;
