import { createSlice } from '@reduxjs/toolkit';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: [],
  reducers: {
    getCountries(state) {
      state = [];
    },
    getCountriesSuccess(_, action) {
      return action.payload;
    },
  },
});
