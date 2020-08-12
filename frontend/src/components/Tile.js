import {
  BOARD_STATE,
  GAME_CONFIG,
  UIUpdateConfig,
} from "../features/ui/UISlice";
import { DISPLAY_TYPE, TRIGGER_TYPE } from "../features/tiles/TilesSlice";
import { filterNeighbours, populateNeighbours } from "./Board";
import { useDispatch, useSelector } from "react-redux";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import ruler from "ruler";
import { tileUpdateProperties } from "../features/tiles/TileSlice";

function showActions(handleClick) {
  return (
    <CardActions disableSpacing>
      <IconButton onClick={handleClick} aria-label="add to favorites">
        <SettingsIcon />
      </IconButton>
    </CardActions>
  );
}

function handleClick(e, row, column, tiles_general, tiles, rows, columns) {
  const tile_positions = _.range(rows).flatMap((row) =>
    _.range(columns).map((col) => [row, col])
  );
  const tiles_properties = _.map(tile_positions, (tile) =>
    populateNeighbours(
      tile,
      rows,
      columns,
      Object.assign(
        {},
        tiles_general.properties,
        tiles?.[tile]?.properties || {}
      )
    )
  );
  const _properties = populateNeighbours(
    [row, column],
    rows,
    columns,
    Object.assign(
      {},
      tiles_general.properties,
      tiles?.[[row, column]]?.properties || {}
    )
  );
  const listeners = tiles_general.events.filter(
    (event) => event.trigger.type === TRIGGER_TYPE.CLICK
  );
  let changes = [];

  _.each(listeners, (event) => {
    _.each(event.actions, (action) => {
      try {
        const rule_condition = ruler.parse(JSON.parse(action.condition));
        const rule_neighbour = ruler.parse(
          JSON.parse(action.condition_neighbour)
        );
        const properties = filterNeighbours(
          _properties,
          _.mapKeys(tiles_properties, (_, key) => tile_positions[key]),
          rule_neighbour
        );

        if (rule_condition(properties)) {
          const rule_set = ruler.parse(JSON.parse(action.set.rule));

          changes.push({
            [action.set.field]: rule_set(properties),
          });
        }
      } catch (e) {
        // skip
      }
    });
  });

  return changes;
}

export default function ({ row, column, ...props }) {
  const isRunning = useSelector(
    (state) => state.ui.state === BOARD_STATE.RUNNING
  );
  const dispatch = useDispatch();
  const tiles_general = useSelector((state) => state.tiles);
  const tiles = useSelector((state) => state.tile);
  const display = useSelector((state) =>
    Object.assign(
      {},
      state.tiles.properties.display,
      state.tile[[row, column]]?.properties?.display || {}
    )
  );

  return (
    <Card square variant="outlined">
      <CardContent
        onClick={(e) =>
          _.each(
            handleClick(
              e,
              row,
              column,
              tiles_general,
              tiles,
              props.rows,
              props.columns
            ),
            (changes) => {
              dispatch(
                tileUpdateProperties({
                  row: row,
                  column: column,
                  properties: changes,
                })
              );
            }
          )
        }
      >
        {display.type === DISPLAY_TYPE.TEXT && (
          <Typography color="textSecondary" gutterBottom>
            {display.value}
          </Typography>
        )}
        {display.type === DISPLAY_TYPE.EMOJI && display.value}
      </CardContent>
      {/*isRunning === false &&
        showActions(() =>
          dispatch(
            UIUpdateConfig({
              type: GAME_CONFIG.TILE,
              param: { row: row, column: column },
            })
          )
          )*/}
    </Card>
  );
}
