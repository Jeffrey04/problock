import { GAME_CONFIG, UIUpdateConfig } from "../features/ui/UISlice";
import { useDispatch, useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import { Drawer } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default function () {
  const isOpened = useSelector(
    (state) => state.ui.config.type === GAME_CONFIG.BOARD
  );
  const properties = useSelector((state) => state.board.properties);
  const dispatch = useDispatch();
  console.log(properties);

  return (
    <Drawer
      anchor="right"
      open={isOpened}
      onClose={() => dispatch(UIUpdateConfig({ type: GAME_CONFIG.NONE }))}
      PaperProps={{ style: { width: "33.3%" } }}
    >
      <Container>
        <form noValidate autoComplete="off">
          <Typography variant="h4" component="h2">
            Board Configuration
          </Typography>
          <Typography variant="h5" component="h3">
            Properties
          </Typography>
          <TextField
            id="standard-basic"
            label="rows"
            defaultValue={properties.rows}
            style={{ marginRight: "1em" }}
            InputProps={{ readOnly: true }}
          />
          <TextField
            id="standard-basic"
            label="columns"
            defaultValue={properties.columns}
            InputProps={{ readOnly: true }}
          />
          <Typography variant="h5" component="h3">
            Events
          </Typography>
        </form>
      </Container>
    </Drawer>
  );
}
