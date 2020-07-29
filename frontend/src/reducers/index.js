import boardReducer from "../features/board/BoardSlice";
import { combineReducers } from "redux";
import uiReducer from "../features/ui/UISlice";

export default combineReducers({
  ui: uiReducer,
  board: boardReducer,
});
