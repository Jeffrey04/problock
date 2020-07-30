import boardReducer from "../features/board/BoardSlice";
import { combineReducers } from "redux";
import tileReducer from "../features/tiles/TileSlice";
import tilesReducer from "../features/tiles/TilesSlice";
import uiReducer from "../features/ui/UISlice";

export default combineReducers({
  ui: uiReducer,
  board: boardReducer,
  tiles: tilesReducer,
  tile: tileReducer,
});
