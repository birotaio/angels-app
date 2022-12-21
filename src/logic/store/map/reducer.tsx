import {createSlice} from '@reduxjs/toolkit';
// TODO typé le reducer pour le récupérer dans le selecteur
export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isLoading: false,
    stations: {},
  },
  reducers: {
    setMapState: (state, action) => ({
      ...state,
      ...action?.payload,
    }),
  },
});

export const {setMapState} = mapSlice.actions;

export default mapSlice.reducer;
