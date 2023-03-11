import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchSliceInintialState = { searching: boolean; query: string; filter: string };

const initialState = {
  searching: false,
  query: '',
  filter: 'relevance',
} as SearchSliceInintialState;

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export default searchSlice;

export const { setFilter, setQuery } = searchSlice.actions;
