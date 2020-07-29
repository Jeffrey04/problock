import { GAME_CONFIG, boardUpdateConfig } from "../features/ui/UISlice";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";

export default function ({ row, column }) {
  const dispatch = useDispatch();

  return (
    <Card square style={{ height: "100%" }} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ position: "absolute", bottom: "0", width: "100%" }}
      >
        <IconButton
          onClick={() =>
            dispatch(
              boardUpdateConfig({
                type: GAME_CONFIG.TILE,
                param: { row: row, column: column },
              })
            )
          }
          aria-label="add to favorites"
        >
          <SettingsIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
