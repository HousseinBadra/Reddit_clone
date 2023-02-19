import { createSlice } from '@reduxjs/toolkit';

type AuthSliceInintialState = { authenticated: boolean };

const initialState = { authenticated: false } as AuthSliceInintialState;

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
});

export default authSlice;
