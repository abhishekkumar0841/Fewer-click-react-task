import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idSequence: "",
  albumId: "",
};

const evenOddPrime = createSlice({
  name: "idSequence",
  initialState,
  reducers: {
    setIdSequence: (state, action) => {
      state.idSequence = action.payload;
    },
    setAlbumId: (state, action) => {
      state.albumId = action.payload;
    },
  },
});

export const { setIdSequence, setAlbumId } = evenOddPrime.actions;
export default evenOddPrime.reducer;
