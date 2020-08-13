import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    properties: {
      rows: 4,
      columns: 4,
    },
  },
  reducers: {},
});

//export const { boardUpdatePropertyNeighbours } = boardSlice.actions;

export default boardSlice.reducer;
