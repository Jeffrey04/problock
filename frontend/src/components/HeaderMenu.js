import { GAME_CONFIG, boardUpdateConfig } from "../features/ui/UISlice";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";

export default function () {
  const dispatch = useDispatch();

  return (
    <div style={{ flexGrow: 1, marginBottom: "2em" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Problock
          </Typography>
          <Button
            onClick={() => {
              dispatch(boardUpdateConfig({ type: GAME_CONFIG.BOARD }));
            }}
            color="inherit"
          >
            Board Config
          </Button>
          <Button
            onClick={() => {
              dispatch(boardUpdateConfig({ type: GAME_CONFIG.TILES }));
            }}
            color="inherit"
          >
            Tile Config
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
