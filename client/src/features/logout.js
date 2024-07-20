
import api from './api';
import { clearUser } from './auth/authSlice';
import store from '../app/store';
import Cookies from 'js-cookie';

const logout = async () => {
  try {
    await api.post('/auth/logout', {}, { withCredentials: true });
  } catch (error) {
    console.error('Error logging out:', error);
  } finally {
    store.dispatch(clearUser());
    Cookies.remove('accessToken'); 
    Cookies.remove('refreshToken');
  }
};

export default logout;
