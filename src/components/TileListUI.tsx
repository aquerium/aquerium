import React from "react";
import { RenderTile } from "./RenderTile";
import { classNames } from "./GridStyles";
import { items } from "./HomeUI";

const TileListUI = () => {
  return <div className={classNames.GridStyle}>{items.map(item => RenderTile(item))}</div>;
};

export default TileListUI;
