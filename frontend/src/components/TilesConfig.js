import {
  DISPLAY_TYPE,
  TRIGGER_TYPE,
  tilesUpdateDisplay,
  tilesUpdateEvent,
  tilesUpdatePropertyNeighbours,
} from "../features/tiles/TilesSlice";
import { GAME_CONFIG, UIUpdateConfig } from "../features/ui/UISlice";
import { clearError, updateError } from "../features/error/ErrorSlice";
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
import ruler from "ruler";

function fieldId(field_name, index_event, index_action) {
  return field_name
    .concat("-")
    .concat(index_event)
    .concat("-")
    .concat(index_action);
}

function triggerTypeOnChange(event, events, index_event) {
  return events.map((incoming, idx_event) => {
    if (idx_event === index_event) {
      return {
        trigger: Object.assign({}, incoming.trigger, {
          type: event.target.value,
        }),
        actions: incoming.actions,
      };
    } else {
      return incoming;
    }
  });
}

function triggerKeyOnChange(event, events, index_event) {
  return events.map((incoming, idx_event) => {
    if (idx_event === index_event) {
      return {
        trigger: Object.assign({}, incoming.trigger, {
          key: event.target.value,
        }),
        actions: incoming.actions,
      };
    } else {
      return incoming;
    }
  });
}

function conditionOnChange(event, events, index_event, index_rule) {
  return events.map((incoming, idx_event) => {
    if (idx_event === index_event) {
      return {
        trigger: incoming.trigger,
        actions: incoming.actions.map((rule, idx_rule) =>
          idx_rule === index_rule
            ? {
                condition: event.target.value,
                condition_neighbour: rule.condition_neighbour,
                set: rule.set,
              }
            : rule
        ),
      };
    } else {
      return incoming;
    }
  });
}

function conditionNeighbourOnChange(event, events, index_event, index_rule) {
  return events.map((incoming, idx_event) => {
    if (idx_event === index_event) {
      return {
        trigger: incoming.trigger,
        actions: incoming.actions.map((rule, idx_rule) =>
          idx_rule === index_rule
            ? {
                condition: rule.condition,
                condition_neighbour: event.target.value,
                set: rule.set,
              }
            : rule
        ),
      };
    } else {
      return incoming;
    }
  });
}

function setOnChange(event, events, index_event, index_rule) {
  return events.map((incoming, idx_event) => {
    if (idx_event === index_event) {
      return {
        trigger: incoming.trigger,
        actions: incoming.actions.map((rule, idx_rule) =>
          idx_rule === index_rule
            ? {
                condition: rule.condition,
                set: Object.assign({}, rule.set, { field: event.target.value }),
              }
            : rule
        ),
      };
    } else {
      return incoming;
    }
  });
}

function actionRuleOnChange(event, events, index_event, index_rule) {
  return events.map((incoming, idx_event) => {
    if (idx_event === index_event) {
      return {
        trigger: incoming.trigger,
        actions: incoming.actions.map((rule, idx_rule) =>
          idx_rule === index_rule
            ? {
                condition: rule.condition,
                set: Object.assign({}, rule.set, { rule: event.target.value }),
              }
            : rule
        ),
      };
    } else {
      return incoming;
    }
  });
}

function ruleIsValid(event) {
  try {
    let rule = JSON.parse(event.target.value);

    return ruler.parse(rule) instanceof Function;
  } catch (e) {
    return false;
  }
}

export default function () {
  const isOpened = useSelector(
    (state) => state.ui.config.type === GAME_CONFIG.TILES
  );
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.tiles.properties);
  const events = useSelector((state) => state.tiles.events);
  const error = useSelector((state) => state.error);

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
              <FormControl
                key={index_tile}
                fullWidth
                margin="normal"
                component="fieldset"
              >
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
                    onChange={(e) =>
                      dispatch(
                        tilesUpdateEvent(
                          triggerTypeOnChange(e, events, index_tile)
                        )
                      )
                    }
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
                      onChange={(e) =>
                        dispatch(
                          tilesUpdateEvent(
                            triggerKeyOnChange(e, events, index_tile)
                          )
                        )
                      }
                      size="medium"
                    ></TextField>
                  )}
                </FormControl>
                {event_tile.actions.map((rule, index_rule) => (
                  <FormControl
                    key={index_rule}
                    fullWidth
                    margin="normal"
                    component="fieldset"
                  >
                    <FormLabel component="legend">Rule {index_rule}</FormLabel>
                    <TextField
                      fullWidth
                      id={fieldId(
                        "event-condition-value",
                        index_tile,
                        index_rule
                      )}
                      label="Condition"
                      value={rule.condition}
                      size="medium"
                      error={
                        error.id ===
                        fieldId("event-condition-value", index_tile, index_rule)
                      }
                      onChange={(e) => {
                        dispatch(
                          tilesUpdateEvent(
                            conditionOnChange(e, events, index_tile, index_rule)
                          )
                        );

                        if (ruleIsValid(e) === false) {
                          dispatch(
                            updateError({
                              id: fieldId(
                                "event-condition-value",
                                index_tile,
                                index_rule
                              ),
                              message: "Condition is malformed",
                            })
                          );
                        } else if (
                          error.id ===
                          fieldId(
                            "event-condition-value",
                            index_tile,
                            index_rule
                          )
                        ) {
                          dispatch(clearError());
                        }
                      }}
                    ></TextField>
                    <TextField
                      fullWidth
                      id={fieldId(
                        "event-condition-neighbour",
                        index_tile,
                        index_rule
                      )}
                      label="Neighbour filter"
                      value={rule.condition_neighbour}
                      size="medium"
                      error={
                        error.id ===
                        fieldId(
                          "event-condition-neighbour",
                          index_tile,
                          index_rule
                        )
                      }
                      onChange={(e) => {
                        dispatch(
                          tilesUpdateEvent(
                            conditionNeighbourOnChange(
                              e,
                              events,
                              index_tile,
                              index_rule
                            )
                          )
                        );

                        if (ruleIsValid(e) === false) {
                          dispatch(
                            updateError({
                              id: fieldId(
                                "event-condition-neighbour",
                                index_tile,
                                index_rule
                              ),
                              message: "Condition is malformed",
                            })
                          );
                        } else if (
                          error.id ===
                          fieldId(
                            "event-condition-neighbour",
                            index_tile,
                            index_rule
                          )
                        ) {
                          dispatch(clearError());
                        }
                      }}
                    ></TextField>
                    <FormControl fullWidth margin="normal" component="fieldset">
                      <FormLabel component="legend">Set value</FormLabel>
                      <TextField
                        fullWidth
                        id={"event-trigger-value-".concat(index_tile)}
                        label="field"
                        value={rule.set.field}
                        size="medium"
                        onChange={(e) =>
                          dispatch(
                            tilesUpdateEvent(
                              setOnChange(e, events, index_tile, index_rule)
                            )
                          )
                        }
                      ></TextField>
                      <TextField
                        fullWidth
                        multiline
                        id={fieldId("event-set-rule", index_tile, index_rule)}
                        label="rule"
                        value={rule.set.rule}
                        error={
                          fieldId("event-set-rule", index_tile, index_rule) ===
                          error.id
                        }
                        onChange={(e) => {
                          dispatch(
                            tilesUpdateEvent(
                              actionRuleOnChange(
                                e,
                                events,
                                index_tile,
                                index_rule
                              )
                            )
                          );

                          if (ruleIsValid(e) === false) {
                            dispatch(
                              updateError({
                                id: fieldId(
                                  "event-set-rule",
                                  index_tile,
                                  index_rule
                                ),
                                message: "Condition is malformed",
                              })
                            );
                          } else if (
                            error.id ===
                            fieldId("event-set-rule", index_tile, index_rule)
                          ) {
                            dispatch(clearError());
                          }
                        }}
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
