import { createSlice } from "@reduxjs/toolkit";

export const BOARD_STATE = {
  RUNNING: "BOARD_IS_RUNNING",
  PAUSED: "BOARD_IS_PAUSED",
};

export const GAME_CONFIG = {
  NONE: "CONFIG_NONE",
  BOARD: "CONFIG_BOARD",
  TILES: "CONFIG_TILES",
  TILE: "CONFIG_TILE",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    state: BOARD_STATE.RUNNING,
    config: { type: GAME_CONFIG.NONE },
  },
  reducers: {
    boardUpdateState(state, action) {
      return Object.assign({}, state, { state: action.payload });
    },
    boardUpdateConfig(state, action) {
      return Object.assign({}, state, { config: action.payload });
    },
  },
});

export const { boardUpdateState, boardUpdateConfig } = uiSlice.actions;

export default uiSlice.reducer;
