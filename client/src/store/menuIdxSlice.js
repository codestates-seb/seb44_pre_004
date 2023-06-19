import { createSlice } from '@reduxjs/toolkit';

export const menuIdxSlice = createSlice({
  name: 'menuIdxSlice',
  initialState: { value: 0 },
  reducers: {
    idx: (state, action) => {
      state.value = action.payload;
    },
  },
});
