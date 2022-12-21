import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    isLogged: false,
  },
  reducers: {
    setAuthState: (state, action) => ({
      ...state,
      ...action?.payload,
    }),
  },
});

export const {setAuthState} = authSlice.actions;

export default authSlice.reducer;
