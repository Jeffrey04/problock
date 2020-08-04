import { createSlice } from "@reduxjs/toolkit";

const tileSlice = createSlice({
  name: "tiles",
  initialState: {},
  reducers: {
    tileUpdateNeighbours(state, action) {
      // delegate state change work to immerjs
      if (!state[[action.payload.row, action.payload.column]]) {
        state[[action.payload.row, action.payload.column]] = {
          properties: {},
          events: [],
        };
      }

      state[[action.payload.row, action.payload.column]].properties.neighbours =
        action.payload.neighbours;
    },
    tileUpdateDisplay(state, action) {
      if (!state[[action.payload.row, action.payload.column]]) {
        state[[action.payload.row, action.payload.column]] = {
          properties: {},
          events: [],
        };
      }

      state[[action.payload.row, action.payload.column]].properties.display =
        action.payload.display;
    },
  },
});

export const {
  tileUpdatePropertyNeighbours,
  tileUpdateDisplay,
} = tileSlice.actions;

export default tileSlice.reducer;
