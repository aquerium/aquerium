import React from "react";
import { TaskTile } from "./TaskTile";
import { TaskTileClassNames } from "./TaskTile.ClassNames";
import { items } from "./HomeUI";

const TileListUI = () => {
  return (
    <div className={TaskTileClassNames.root}>
      <div className={TaskTileClassNames.listContainer}>{items.map(item => TaskTile(item))}</div>
    </div>
  );
};

export default TileListUI;
