import { configureStore } from '@reduxjs/toolkit';
import { showComponents } from './showComponentsSlice';

export const store = configureStore({
  reducer: {
    showComponents: showComponents.reducer,
  },
});
