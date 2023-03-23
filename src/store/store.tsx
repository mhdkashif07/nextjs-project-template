import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';
import loadingReducer from './reducers/loadingSlice';
import productReducer from './reducers/dataSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    loading: loadingReducer,
    productData: productReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
