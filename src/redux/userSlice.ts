import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    username: '',
  },
} as State;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: function (state, action) {
      return (state = action.payload);
    },
    signOut: function (state) {
      return (state = initialState);
    },
  },
});

const userReducer = userSlice.reducer;

export const { signIn, signOut } = userSlice.actions;

export default userReducer;
