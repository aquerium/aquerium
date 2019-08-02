import React from "react";
import { RenderTile } from "./RenderTile";
import { classNames } from "./GridStyles";
import { items } from "./HomeUI";

const TileListUI = () => {
  return (
    <div className={classNames.root}>
      <div className={classNames.listContainer}>{items.map(item => RenderTile(item))}</div>
    </div>
  );
};

export default TileListUI;
