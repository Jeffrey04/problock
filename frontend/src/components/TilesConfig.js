import {
  DISPLAY_TYPE,
  TRIGGER_TYPE,
  tilesUpdateDisplay,
  tilesUpdatePropertyNeighbours,
} from "../features/tiles/TilesSlice";
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
import { TextField } from "@material-ui/core";
import TilePropertyNeighbours from "./TilePropertyNeighbours";
import Typography from "@material-ui/core/Typography";

export default function () {
  const isOpened = useSelector(
    (state) => state.ui.config.type === GAME_CONFIG.TILES
  );
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.tiles.properties);
  const events = useSelector((state) => state.tiles.events);

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
        style={{ margin: "1em auto", padding: "1em 0", width: "66.7%" }}
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
            {events.map((event_tile, index_tile) => (
              <FormControl fullWidth margin="normal" component="fieldset">
                <FormLabel component="legend">Event {index_tile + 1}</FormLabel>
                <FormControl fullWidth margin="normal" component="fieldset">
                  <FormLabel component="legend">Trigger</FormLabel>
                  <TextField
                    fullWidth
                    select
                    id={"event-trigger-type-".concat(index_tile)}
                    label="Type"
                    value={event_tile.trigger.type}
                    size="medium"
                  >
                    <MenuItem value={TRIGGER_TYPE.KEYPRESS}>Keypress</MenuItem>
                    <MenuItem value={TRIGGER_TYPE.CLICK}>Click</MenuItem>
                  </TextField>
                  {event_tile.trigger.type === TRIGGER_TYPE.KEYPRESS && (
                    <TextField
                      fullWidth
                      id={"event-trigger-value-".concat(index_tile)}
                      label="Key"
                      value={event_tile.trigger.key}
                      size="medium"
                    ></TextField>
                  )}
                </FormControl>
                {event_tile.actions.map((action, index_action) => (
                  <FormControl fullWidth margin="normal" component="fieldset">
                    <FormLabel component="legend">
                      Action {index_action}
                    </FormLabel>
                    <TextField
                      fullWidth
                      mukltiline
                      id={"event-trigger-value-".concat(index_tile)}
                      label="Condition"
                      value={JSON.stringify(action.condition)}
                      size="medium"
                    ></TextField>
                    <FormControl fullWidth margin="normal" component="fieldset">
                      <FormLabel component="legend">Set value</FormLabel>
                      <TextField
                        fullWidth
                        id={"event-trigger-value-".concat(index_tile)}
                        label="field"
                        value={action.set.field}
                        size="medium"
                      ></TextField>
                      <TextField
                        fullWidth
                        multiline
                        id={"event-trigger-value-".concat(index_tile)}
                        label="rule"
                        value={JSON.stringify(action.set.rule)}
                        size="medium"
                      ></TextField>
                    </FormControl>
                  </FormControl>
                ))}
              </FormControl>
            ))}
            <Typography variant="body1">Some quick board properties</Typography>
          </form>
        </Container>
      </Paper>
    </Modal>
  );
}
