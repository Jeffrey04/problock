import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import React from "react";
import Tile from "./Tile";

export default function (props) {
  return (
    <GridList cellHeight={160} spacing={5} cols={props.columns}>
      {[...Array(props.rows).keys()].map((row) =>
        [...Array(props.columns).keys()].map((column) => (
          <GridListTile key={(row + 1) * column}>
            <Tile row={row} column={column} />
          </GridListTile>
        ))
      )}
    </GridList>
  );
}
