import { createSlice } from "@reduxjs/toolkit";

export const BOARD_NEIGHBOURS = {
  TL: "TOP_LEFT",
  T: "TOP",
  TR: "TOP_RIGHT",
  L: "LEFT",
  R: "RIGHT",
  BL: "BOTTOM_LEFT",
  B: "BOTTOM",
  BR: "BOTTOM_RIGHT",
};

const boardSlice = createSlice({
  name: "board",
  initialState: {
    properties: {
      neighbours: [
        BOARD_NEIGHBOURS.TL,
        BOARD_NEIGHBOURS.T,
        BOARD_NEIGHBOURS.TR,
        BOARD_NEIGHBOURS.L,
        BOARD_NEIGHBOURS.R,
        BOARD_NEIGHBOURS.BL,
        BOARD_NEIGHBOURS.B,
        BOARD_NEIGHBOURS.BR,
      ],
    },
  },
  reducers: {
    boardUpdatePropertyNeighbours(state, action) {
      return Object.assign({}, state, {
        properties: Object.assign({}, state.properties, {
          neighbours: action.payload,
        }),
      });
    },
  },
});

export const { boardUpdatePropertyNeighbours } = boardSlice.actions;

export default boardSlice.reducer;
