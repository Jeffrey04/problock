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

export const DISPLAY_TYPE = {
  NONE: "NONE",
  TEXT: "TEXT",
  EMOJI: "EMOJI",
};

const tilesSlice = createSlice({
  name: "tiles",
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
      display: { type: DISPLAY_TYPE.NONE },
    },
    events: [
      {
        trigger: { type: "keypress", key: "@space" },
        actions: [
          {
            condition: [
              "basic.Context",
              ["array.Length", ["basic.Field", "@neighbours"]],
              ["condition.In", 2, 3],
            ],
            set: {
              field: "display",
              rule: [
                "basic.Value",
                { type: DISPLAY_TYPE.TEXT, value: "ALIVE" },
              ],
            },
          },
          {
            condition: [
              "boolean.Not",
              [
                "basic.Context",
                ["array.Length", ["basic.Field", "@neighbours"]],
                ["condition.In", 2, 3],
              ],
            ],
            action: {
              field: "display",
              rule: ["basic.Value", { type: DISPLAY_TYPE.NONE }],
            },
          },
        ],
      },
      {
        trigger: { type: "click" },
        actions: [
          {
            condition: [],
            set: {
              field: "display",
              rule: [
                "basic.Value",
                { type: DISPLAY_TYPE.TEXT, value: "ALIVE" },
              ],
            },
          },
          {
            condition: [],
            set: {
              field: "display",
              rule: ["basic.Value", { type: DISPLAY_TYPE.NONE }],
            },
          },
        ],
      },
    ],
  },
  reducers: {
    tilesUpdateNeighbours(state, action) {
      return Object.assign({}, state, {
        properties: Object.assign({}, state.properties, {
          neighbours: action.payload,
        }),
      });
    },
    tilesUpdateDisplay(state, action) {
      return Object.assign({}, state, {
        properties: Object.assign({}, state.properties, {
          display: action.payload,
        }),
      });
    },
  },
});

export const {
  tilesUpdatePropertyNeighbours,
  tilesUpdateDisplay,
} = tilesSlice.actions;

export default tilesSlice.reducer;
