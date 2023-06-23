import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    memberId: '',
    name: '',
    email: '',
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.memberId = action.payload.memberId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state) => {
      state.memberId = null;
      state.name = null;
      state.email = null;
      state.isLoggedIn = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
