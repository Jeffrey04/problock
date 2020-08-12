import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    id: null,
    message: null,
  },
  reducers: {
    updateError(_state, action) {
      return {
        id: action.payload.id,
        message: action.payload.message,
      };
    },
    clearError(_state, _action) {
      return { id: null, message: null };
    },
  },
});

export const { updateError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
