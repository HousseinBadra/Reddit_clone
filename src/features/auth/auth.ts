import { createSlice } from '@reduxjs/toolkit';

type AuthSliceInintialState = {
  authenticated: boolean;
  loading: boolean;
};

const initialState = {
  authenticated: !!localStorage.getItem('access_token'),
} as AuthSliceInintialState;

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signout: (state) => {
      localStorage.setItem('access_token', '');
      localStorage.setItem('refresh_token', '');
      state.authenticated = false;
    },
    setAuth: (state) => {
      state.authenticated = true;
    },
  },
});

export default authSlice;

export const { setAuth, signout } = authSlice.actions;
