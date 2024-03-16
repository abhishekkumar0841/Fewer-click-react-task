import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: [],
  filteredData: [],
};

const fetchedData = createSlice({
  name: "apiData",
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      state.initialData = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
  },
});

export const { setInitialData, setFilteredData } = fetchedData.actions;
export default fetchedData.reducer;
