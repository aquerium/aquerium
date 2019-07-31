import React from "react";
import { HomeUIContext } from "./HomeUIContext";
import { RenderTile, classNames } from "./RenderTileGrid";

const CardListUI = () => {
  const { items } = React.useContext(HomeUIContext);
  return (
    <div
      className={classNames.listGridExample}
      //data-is-editing={isEditing}
    >
      {items.map(item => RenderTile(item))}
    </div>
  );
};

export default CardListUI;
