import React from "react";
import { HomeUIContext } from "./HomeUIContext";
import { RenderTile } from "./RenderTile";
import { classNames } from "./GridStyles";

const TileListUI = () => {
  const { items } = React.useContext(HomeUIContext);
  return (
    <div
      className={classNames.GridStyle}
      //data-is-editing={isEditing}
    >
      {items.map(item => RenderTile(item))}
    </div>
  );
};

export default TileListUI;
