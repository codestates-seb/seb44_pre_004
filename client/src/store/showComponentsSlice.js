import { createSlice } from '@reduxjs/toolkit';

export const showComponents = createSlice({
  name: 'showComponents',
  initialState: { showNav: true, showFooter: true },
  reducers: {
    setNav(state, action) {
      return { ...state, showNav: action.payload };
    },
    setFooter(state, action) {
      return { ...state, showFooter: action.payload };
    },
  },
});

export const { setNav, setFooter } = showComponents.actions;
