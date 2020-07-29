import Board from "./Board";
import BoardConfig from "./BoardConfig";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import HeaderMenu from "./HeaderMenu";
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import TileConfig from "./TileConfig";
import Typography from "@material-ui/core/Typography";

export default function () {
  return (
    <React.Fragment>
      <CssBaseline />
      <HeaderMenu />
      <BoardConfig />
      <TileConfig />
      <Container fixed>
        <Typography variant="h1">Problock</Typography>
        <Board rows={4} columns={4} />
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "absolute", bottom: "2em", right: "2em" }}
      >
        <SettingsIcon />
      </Fab>
    </React.Fragment>
  );
}
