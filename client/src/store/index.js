import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
