import { createSlice } from '@reduxjs/toolkit';

type AuthSliceInintialState = {
  authenticated: boolean;
  access_token: string;
  refresh_token: string;
  loading: boolean;
};

// type SuccessResponse = {
//   access_token: string;
//   token_type: string;
//   expires_in: string;
//   scope: string;
//   refresh_token: string;
// };

// type Cred = {
//   access_token: string;
//   refresh_token: string;
// };

const initialState = {
  authenticated: false,
  access_token: localStorage.getItem('access_token') || '',
  refresh_token: localStorage.getItem('refresh_token') || '',
} as AuthSliceInintialState;

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signout: (state) => {
      state.access_token = '';
      state.refresh_token = '';
      localStorage.setItem('access_token', '');
      localStorage.setItem('refresh_token', '');
    },
    setAuth: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      localStorage.setItem('access_token', action.payload.access_token);
      localStorage.setItem('refresh_token', action.payload.refresh_token);
    },
  },
});

export default authSlice;

export const { setAuth } = authSlice.actions;
