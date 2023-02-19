import { createSlice } from '@reduxjs/toolkit';

type SearchSliceInintialState = { searching: boolean; query: string; type: string };

const initialState = { searching: false, query: '', type: '' } as SearchSliceInintialState;

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
});

export default searchSlice;
