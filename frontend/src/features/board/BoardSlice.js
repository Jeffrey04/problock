import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    properties: {},
  },
  reducers: {},
});

//export const { boardUpdatePropertyNeighbours } = boardSlice.actions;

export default boardSlice.reducer;
