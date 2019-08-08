import React from "react";
import { RenderTile } from "./TaskTile";
import { classNames } from "./TaskTile.ClassNames";
import { connect } from "react-redux";
import { IState, IQuery } from "../state/state.types";

interface ITileListUIProps {
  queryList: { [key: string]: IQuery };
}

function TileList_UI(props: ITileListUIProps) {
  return (
    <div className={classNames.root}>
      <div className={classNames.listContainer}>
        {Object.keys(props.queryList).map(key => (
          <RenderTile item={props.queryList[key]} key={key} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  queryList: state.queryList
});

export const TileListUI = connect(mapStateToProps)(TileList_UI);
