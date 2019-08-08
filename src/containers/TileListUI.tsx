import React from "react";
import { TaskTile } from "../components/TaskTile";
import { TaskTileClassNames } from "../components/TaskTile.ClassNames";
import { connect } from "react-redux";
import { IState, IQuery } from "../state/state.types";

interface ITileListUIProps {
  queryList: { [key: string]: IQuery };
}

function TileListUIComponent(props: ITileListUIProps) {
  return (
    <div className={TaskTileClassNames.root}>
      <div className={TaskTileClassNames.listContainer}>
        {Object.keys(props.queryList).map(key => (
          <TaskTile item={props.queryList[key]} key={key} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  queryList: state.queryList
});

export const TileListUI = connect(mapStateToProps)(TileListUIComponent);
