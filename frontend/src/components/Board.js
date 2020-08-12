import { BOARD_NEIGHBOURS, TRIGGER_TYPE } from "../features/tiles/TilesSlice";
import { useDispatch, useSelector } from "react-redux";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import React from "react";
import Tile from "./Tile";
import { Typography } from "@material-ui/core";
import _ from "lodash";
import ruler from "ruler";
import { tileUpdateProperties } from "../features/tiles/TileSlice";

export function populateNeighbours([row, column], rows, columns, properties) {
  return Object.assign({}, properties, {
    ["@neighbours"]: properties.neighbours
      .map((position) => {
        switch (position) {
          case BOARD_NEIGHBOURS.TL:
            return [row - 1, column - 1];
          case BOARD_NEIGHBOURS.T:
            return [row - 1, column];
          case BOARD_NEIGHBOURS.TR:
            return [row - 1, column + 1];
          case BOARD_NEIGHBOURS.L:
            return [row, column - 1];
          case BOARD_NEIGHBOURS.R:
            return [row, column + 1];
          case BOARD_NEIGHBOURS.BL:
            return [row + 1, column - 1];
          case BOARD_NEIGHBOURS.B:
            return [row + 1, column];
          case BOARD_NEIGHBOURS.BR:
            return [row + 1, column + 1];
        }
      })
      .filter(
        ([row, column]) =>
          _.inRange(row, 0, rows) && _.inRange(column, 0, columns)
      ),
  });
}

export function filterNeighbours(properties, tiles_properties, rule_neighbour) {
  return Object.assign({}, properties, {
    ["@neighbours"]: properties["@neighbours"].filter((position) => {
      return rule_neighbour(tiles_properties[position]);
    }),
  });
}

function handleKey(e, tiles_general, tiles, rows, columns) {
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
  const listeners = tiles_general.events.filter(
    (event) => event.trigger.type === TRIGGER_TYPE.KEYPRESS
  );
  let changes = [];

  _.each(listeners, (event) => {
    if (e.key === triggerKey(event.trigger.key)) {
      _.each(event.actions, (action) => {
        try {
          const rule_condition = ruler.parse(JSON.parse(action.condition));
          const rule_neighbour = ruler.parse(
            JSON.parse(action.condition_neighbour)
          );
          _.each(tiles_properties, (_properties, key) => {
            const properties = filterNeighbours(
              _properties,
              _.mapKeys(tiles_properties, (_, key) => tile_positions[key]),
              rule_neighbour
            );
            if (rule_condition(properties)) {
              const rule_set = ruler.parse(JSON.parse(action.set.rule));

              changes.push([
                tile_positions[key],
                {
                  [action.set.field]: rule_set(properties),
                },
              ]);
            }
          });
        } catch (e) {
          // skip
          console.log(e);
        }
      });
    }
  });

  return changes;
}

function triggerKey(value) {
  switch (value) {
    case "@space":
      return " ";
    default:
      return value;
  }
}

export default function (props) {
  const tiles_general = useSelector((state) => state.tiles);
  const tiles = useSelector((state) => state.tile);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <GridList
        cellHeight="auto"
        spacing={5}
        cols={props.columns}
        tabIndex={-1}
        onKeyDown={(e) =>
          _.each(
            handleKey(e, tiles_general, tiles, props.rows, props.columns),
            ([[row, column], changes]) => {
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
        {[...Array(props.rows).keys()].map((row) =>
          [...Array(props.columns).keys()].map((column) => (
            <GridListTile key={(row + 1) * column}>
              <Tile
                row={row}
                column={column}
                rows={props.rows}
                columns={props.columns}
              />
            </GridListTile>
          ))
        )}
      </GridList>
      {/*<Typography variant="body1">Some configured triggers: </Typography>*/}
    </React.Fragment>
  );
}
