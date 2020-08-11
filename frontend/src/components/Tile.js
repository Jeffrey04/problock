import {
  BOARD_STATE,
  GAME_CONFIG,
  UIUpdateConfig,
} from "../features/ui/UISlice";
import { useDispatch, useSelector } from "react-redux";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { DISPLAY_TYPE } from "../features/tiles/TilesSlice";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";

function showActions(handleClick) {
  return (
    <CardActions disableSpacing>
      <IconButton onClick={handleClick} aria-label="add to favorites">
        <SettingsIcon />
      </IconButton>
    </CardActions>
  );
}

export default function ({ row, column }) {
  const isRunning = useSelector(
    (state) => state.ui.state === BOARD_STATE.RUNNING
  );
  const dispatch = useDispatch();
  const display = useSelector(
    (state) =>
      state.tile[[row, column]]?.properties?.display ||
      state.tiles.properties.display
  );

  return (
    <Card square variant="outlined">
      <CardContent>
        {display.type === DISPLAY_TYPE.TEXT && (
          <Typography color="textSecondary" gutterBottom>
            {display.value}
          </Typography>
        )}
        {display.type === DISPLAY_TYPE.EMOJI && display.value}
      </CardContent>
      {/*isRunning === false &&
        showActions(() =>
          dispatch(
            UIUpdateConfig({
              type: GAME_CONFIG.TILE,
              param: { row: row, column: column },
            })
          )
          )*/}
    </Card>
  );
}
