import React from "react";
import { TaskTile } from "../components/TaskTile";
import { TaskTileClassNames } from "../components/TaskTile.ClassNames";
import { connect } from "react-redux";
import { IState, queryListType } from "../state";

/**
 * @property { queryListType } queryList the queryList map that is passed in, element at a time, to be rendered by TaskTile
 */
interface ITileListUIProps {
  queryList: queryListType;
}

function TileListComponent(props: ITileListUIProps) {
  return (
    <div className={TaskTileClassNames.root}>
      <div className={TaskTileClassNames.listContainer}>
        {Object.keys(props.queryList).map(key => (
          <TaskTile query={props.queryList[key]} key={key} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  queryList: state.queryList
});

export const TileListUI = connect(mapStateToProps)(TileListComponent);
