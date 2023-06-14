import { createSlice } from '@reduxjs/toolkit';
import { createAccountUser, logInUser } from './user.actions';

const initialState = {
  error: null,
  email: null,
  userName: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.userName = null;
    },
  },
  extraReducers: {
    [logInUser.fulfilled.type]: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.id = action.payload.id;
    },
    [createAccountUser.fulfilled.type]: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.id = action.payload.id;
    },
  },
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
