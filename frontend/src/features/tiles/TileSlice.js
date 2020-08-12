import _ from "lodash";
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
    tileUpdateProperties(state, action) {
      if (!state[[action.payload.row, action.payload.column]]) {
        state[[action.payload.row, action.payload.column]] = {
          properties: {},
          events: [],
        };
      }

      state[
        [action.payload.row, action.payload.column]
      ].properties = Object.assign(
        {},
        state[[action.payload.row, action.payload.column]].properties,
        action.payload.properties
      );
    },
  },
});

export const {
  tileUpdatePropertyNeighbours,
  tileUpdateDisplay,
  tileUpdateProperties,
} = tileSlice.actions;

export default tileSlice.reducer;
