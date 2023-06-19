import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { showComponents } from './showComponentsSlice';
import { menuIdxSlice } from './menuIdxSlice';

// export const store = configureStore({
//   reducer: {
//     showComponents: showComponents.reducer,
//     idx: menuIdxSlice.reducer,
//   },
// });

const reducers = combineReducers({
  showComponents: showComponents.reducer,
  idx: menuIdxSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['showComponents', 'idx'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
