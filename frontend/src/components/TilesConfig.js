import {
  DISPLAY_TYPE,
  tilesUpdateDisplay,
  tilesUpdatePropertyNeighbours,
} from "../features/tiles/TilesSlice";
import { FormGroup, TextField } from "@material-ui/core";
import { GAME_CONFIG, UIUpdateConfig } from "../features/ui/UISlice";
import { useDispatch, useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import React from "react";
import TilePropertyNeighbours from "./TilePropertyNeighbours";
import Typography from "@material-ui/core/Typography";

export default function () {
  const isOpened = useSelector(
    (state) => state.ui.config.type === GAME_CONFIG.TILES
  );
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.tiles.properties);

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
            <Typography variant="h2">General Tiles Configuration</Typography>
            <Typography variant="h3">Properties</Typography>
            <div>
              <TilePropertyNeighbours
                neighbours={properties.neighbours}
                action={(neighbours) =>
                  tilesUpdatePropertyNeighbours(neighbours)
                }
              />
              <FormControl fullWidth margin="normal" component="fieldset">
                <FormLabel component="legend">@display</FormLabel>
                <GridList cellHeight="auto" cols={3}>
                  <GridListTile>
                    <TextField
                      fullWidth
                      select
                      id="tile-display-type"
                      label="Type"
                      value={properties.display.type}
                      onChange={(event) =>
                        dispatch(
                          tilesUpdateDisplay({ type: event.target.value })
                        )
                      }
                      size="medium"
                    >
                      <MenuItem value={DISPLAY_TYPE.NONE}>Empty</MenuItem>
                      <MenuItem value={DISPLAY_TYPE.TEXT}>Text</MenuItem>
                      <MenuItem value={DISPLAY_TYPE.EMOJI}>Emoji</MenuItem>
                    </TextField>
                  </GridListTile>
                  {properties.display.type === DISPLAY_TYPE.TEXT && (
                    <GridListTile>
                      <TextField
                        value={properties.display.value || ""}
                        label="Value"
                        onChange={(event) =>
                          dispatch(
                            tilesUpdateDisplay(
                              Object.assign({}, properties.display, {
                                value: event.target.value,
                              })
                            )
                          )
                        }
                      ></TextField>
                    </GridListTile>
                  )}
                </GridList>
              </FormControl>
            </div>
            <Typography variant="h3">Events</Typography>
            <Typography variant="body1">Some quick board properties</Typography>
          </form>
        </Container>
      </Paper>
    </Modal>
  );
}
