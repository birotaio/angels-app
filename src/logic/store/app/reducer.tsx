import {createSlice} from '@reduxjs/toolkit';
// TODO typé le reducer pour le récupérer dans le selecteur
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    bike: null,
  },
  reducers: {
    setAppState: (state, action) => ({
      ...state,
      ...action?.payload,
    }),
  },
});

export const {setAppState} = appSlice.actions;

export default appSlice.reducer;
