import { GAME_CONFIG, UIUpdateConfig } from "../features/ui/UISlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";

export default function () {
  const isOpened = useSelector(
    (state) => state.ui.config.type === GAME_CONFIG.BOARD
  );
  const dispatch = useDispatch();

  return (
    <Modal
      open={isOpened}
      onClose={() => dispatch(UIUpdateConfig({ type: GAME_CONFIG.NONE }))}
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
            <Typography variant="h2">Board Configuration</Typography>
            <Typography variant="h3">Properties</Typography>
            <Typography variant="h4">@neighbors</Typography>
            <Typography variant="h3">Events</Typography>
            <Typography variant="body1">Some quick board properties</Typography>
            <Button variant="contained">Save</Button>
          </form>
        </Container>
      </Paper>
    </Modal>
  );
}
