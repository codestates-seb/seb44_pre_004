import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    memberId: '',
    name: '',
    email: '',
    isloggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.memberId = action.payload.memberId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isloggedIn = action.payload.isloggedIn;
    },
    logout: (state) => {
      state.memberId = null;
      state.name = null;
      state.email = null;
      state.isloggedIn = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
