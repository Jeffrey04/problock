import { GAME_CONFIG, boardUpdateConfig } from "../features/ui/UISlice";
import { useDispatch, useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import React from "react";
import TilePropertyNeighbours from "./TilePropertyNeighbours";
import Typography from "@material-ui/core/Typography";
import { boardUpdatePropertyNeighbours } from "../features/board/BoardSlice";

export default function () {
  const isOpened = useSelector(
    (state) => state.ui.config.type === GAME_CONFIG.TILES
  );
  const dispatch = useDispatch();
  const neighbours = useSelector((state) => state.board.properties.neighbours);

  return (
    <Modal
      open={isOpened}
      onClose={() => dispatch(boardUpdateConfig({ type: GAME_CONFIG.NONE }))}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper
        elevation={3}
        square
        style={{ margin: "10em auto", padding: "1em 0", width: "66.7%" }}
      >
        <Container>
          <form noValidate autoComplete="off">
            <Typography variant="h2">General Tiles Configuration</Typography>
            <Typography variant="h3">Properties</Typography>
            <TilePropertyNeighbours
              neighbours={neighbours}
              action={(neighbours) => boardUpdatePropertyNeighbours(neighbours)}
            />
            <Typography variant="h3">Events</Typography>
            <Typography variant="body1">Some quick board properties</Typography>
          </form>
        </Container>
      </Paper>
    </Modal>
  );
}
