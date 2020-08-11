import { BOARD_STATE, UIUpdateState } from "../features/ui/UISlice";
import { useDispatch, useSelector } from "react-redux";

import Board from "./Board";
import BoardConfig from "./BoardConfig";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import HeaderMenu from "./HeaderMenu";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import TileConfig from "./TileConfig";
import TilesConfig from "./TilesConfig";
import Typography from "@material-ui/core/Typography";

export default function () {
  const boardState = useSelector((state) => state.ui.state);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <CssBaseline />
      <HeaderMenu />
      <BoardConfig />
      <TileConfig />
      <TilesConfig />
      <Container fixed>
        <Typography variant="h1">Problock</Typography>
        <Board rows={4} columns={4} />
      </Container>
      {/*
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "absolute", bottom: "2em", right: "2em" }}
        onClick={() =>
          dispatch(
            UIUpdateState(
              boardState === BOARD_STATE.RUNNING
                ? BOARD_STATE.PAUSED
                : BOARD_STATE.RUNNING
            )
          )
        }
      >
        {boardState === BOARD_STATE.RUNNING ? (
          <SettingsIcon />
        ) : (
          <PlayArrowIcon />
        )}
      </Fab>
       */}
    </React.Fragment>
  );
}
