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

export const TRIGGER_TYPE = {
  KEYPRESS: "keypress",
  CLICK: "click",
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
      display: { type: DISPLAY_TYPE.TEXT, value: "DEAD" },
    },
    events: [
      {
        trigger: { type: TRIGGER_TYPE.KEYPRESS, key: "@space" },
        actions: [
          {
            condition: JSON.stringify([
              "boolean.And",
              ["basic.Value", { type: DISPLAY_TYPE.TEXT, value: "DEAD" }],
              [
                "condition.Equal",
                ["array.Length", ["basic.Field", "@neighbours"]],
                3,
              ],
            ]),
            condition_neighbour: JSON.stringify([
              "condition.Equal",
              ["basic.Field", "display"],
              { type: DISPLAY_TYPE.TEXT, value: "ALIVE" },
            ]),
            set: {
              field: "display",
              rule: JSON.stringify([
                "basic.Value",
                { type: DISPLAY_TYPE.TEXT, value: "ALIVE" },
              ]),
            },
          },
          {
            condition: JSON.stringify([
              "boolean.And",
              ["basic.Value", { type: DISPLAY_TYPE.TEXT, value: "ALIVE" }],
              [
                "condition.In",
                ["array.Length", ["basic.Field", "@neighbours"]],
                [2, 3],
              ],
              ,
            ]),
            condition_neighbour: JSON.stringify([
              "condition.Equal",
              ["basic.Field", "display"],
              { type: DISPLAY_TYPE.TEXT, value: "ALIVE" },
            ]),
            set: {
              field: "display",
              rule: JSON.stringify([
                "basic.Value",
                { type: DISPLAY_TYPE.TEXT, value: "ALIVE" },
              ]),
            },
          },
          {
            condition: JSON.stringify([
              "boolean.And",
              ["basic.Value", { type: DISPLAY_TYPE.TEXT, value: "ALIVE" }],
              [
                "boolean.Not",
                [
                  "condition.In",
                  ["array.Length", ["basic.Field", "@neighbours"]],
                  [2, 3],
                ],
              ],
            ]),
            condition_neighbour: JSON.stringify([
              "condition.Equal",
              ["basic.Field", "display"],
              { type: DISPLAY_TYPE.TEXT, value: "ALIVE" },
            ]),
            set: {
              field: "display",
              rule: JSON.stringify([
                "basic.Value",
                { type: DISPLAY_TYPE.TEXT, value: "DEAD" },
              ]),
            },
          },
        ],
      },
      {
        trigger: { type: TRIGGER_TYPE.CLICK },
        actions: [
          {
            condition: JSON.stringify([
              "condition.Equal",
              ["basic.Field", "display"],
              { type: DISPLAY_TYPE.TEXT, value: "DEAD" },
            ]),
            condition_neighbour: JSON.stringify(["boolean.Tautology"]),
            set: {
              field: "display",
              rule: JSON.stringify([
                "basic.Value",
                { type: DISPLAY_TYPE.TEXT, value: "ALIVE" },
              ]),
            },
          },
          {
            condition: JSON.stringify([
              "condition.Equal",
              ["basic.Field", "display"],
              { type: DISPLAY_TYPE.TEXT, value: "ALIVE" },
            ]),
            condition_neighbour: JSON.stringify(["boolean.Tautology"]),
            set: {
              field: "display",
              rule: JSON.stringify([
                "basic.Value",
                { type: DISPLAY_TYPE.TEXT, value: "DEAD" },
              ]),
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
    tilesUpdateEvent(state, action) {
      return Object.assign({}, state, {
        events: action.payload,
      });
    },
  },
});

export const {
  tilesUpdatePropertyNeighbours,
  tilesUpdateDisplay,
  tilesUpdateEvent,
} = tilesSlice.actions;

export default tilesSlice.reducer;
