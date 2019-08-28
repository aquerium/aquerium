import React from "react";
import { QueryTile } from "./QueryTile";
import { QueryTileClassNames } from "./QueryTile.styles";
import { connect } from "react-redux";
import { IState, queryListType } from "../state/state.types";

interface ITileListUIProps {
  /** The queryList map that is passed in, element at a time, to be rendered by QueryTile. */
  queryList: queryListType;
}

function QueryListComponent(props: ITileListUIProps) {
  return (
    <div className={QueryTileClassNames.root}>
      <div className={QueryTileClassNames.listContainer}>
        {Object.keys(props.queryList).map(key => (
          <QueryTile currQuery={props.queryList[key]} key={key} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  queryList: state.queryList
});

export const QueryListUI = connect(mapStateToProps)(QueryListComponent);
