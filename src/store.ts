import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/auth';
import searchSlice from './features/search/seachSlice';
import FeedSlice from './features/feed/feedSlice';

export const store = configureStore({
  reducer: { auth: authSlice.reducer, search: searchSlice.reducer, feed: FeedSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
