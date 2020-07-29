import { GAME_CONFIG, boardUpdateConfig } from "../features/ui/UISlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default function (props) {
  const uiConfig = useSelector((state) => state.ui.config);
  const dispatch = useDispatch();

  return (
    <Modal
      open={uiConfig.type === GAME_CONFIG.TILE}
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
            <Typography variant="h2">Tile Configuration</Typography>
            <Typography variant="h3">Properties</Typography>
            <TextField
              id="standard-basic"
              label="@row"
              defaultValue={uiConfig.param?.row}
              style={{ marginRight: "1em" }}
              InputProps={{ readOnly: true }}
            />
            <TextField
              id="standard-basic"
              label="@column"
              defaultValue={uiConfig.param?.column}
              InputProps={{ readOnly: true }}
            />
            <Typography variant="h3">Events</Typography>
            <Typography variant="body1">Some quick board properties</Typography>
            <Button variant="contained">Save</Button>
          </form>
        </Container>
      </Paper>
    </Modal>
  );
}
