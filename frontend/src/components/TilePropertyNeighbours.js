import { BOARD_NEIGHBOURS } from "../features/board/BoardSlice";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import React from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";

function toggleNeighbours(neighbours, neighbour) {
  return _.includes(neighbours, neighbour)
    ? neighbours.filter((incoming) => incoming !== neighbour)
    : neighbours.concat([neighbour]);
}

function Neighbour({ neighbours, action, label, value, disabled = false }) {
  const dispatch = useDispatch();

  return (
    <FormControlLabel
      control={<Checkbox disabled={disabled} name="value" />}
      checked={disabled || _.includes(neighbours, value)}
      label={label}
      onChange={
        disabled
          ? null
          : () => dispatch(action(toggleNeighbours(neighbours, value)))
      }
    />
  );
}

export default function ({ neighbours, action }) {
  const tiles = {
    [BOARD_NEIGHBOURS.TL]: "Top-left",
    [BOARD_NEIGHBOURS.T]: "Top",
    [BOARD_NEIGHBOURS.TR]: "Top-right",
    [BOARD_NEIGHBOURS.L]: "Left",
    "@self": "@self",
    [BOARD_NEIGHBOURS.R]: "Right",
    [BOARD_NEIGHBOURS.BL]: "Bottom-left",
    [BOARD_NEIGHBOURS.B]: "Bottom",
    [BOARD_NEIGHBOURS.BR]: "Bottom-right",
  };

  return (
    <FormControl fullWidth component="fieldset">
      <FormLabel component="legend">Neighbours</FormLabel>
      <FormGroup>
        <GridList cellHeight="auto" cols={3}>
          {Object.entries(tiles).map(([value, label]) => (
            <GridListTile key={value}>
              <Neighbour
                neighbours={neighbours}
                action={action}
                label={label}
                value={value}
                disabled={value === label}
              />
            </GridListTile>
          ))}
        </GridList>
      </FormGroup>
      <FormHelperText>The tiles to be considered as neighbours</FormHelperText>
    </FormControl>
  );
}
