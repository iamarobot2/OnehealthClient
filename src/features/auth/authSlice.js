import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      Cookies.set('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      Cookies.remove('user');
    },
    initializeFromCookies: (state) => {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        try {
          state.user = JSON.parse(userCookie);
        } catch (e) {
          console.error("Failed to parse user cookie:", e);
          state.user = null;
          Cookies.remove('user'); 
        }
      }
    }
  }
});

export const { setUser, clearUser, initializeFromCookies } = authSlice.actions;
export default authSlice.reducer;
