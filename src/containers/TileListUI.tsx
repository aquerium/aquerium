import React from "react";
import { QueryTile } from "../components/QueryTile";
import { QueryTileClassNames } from "../components/QueryTile.styles";
import { connect } from "react-redux";
import { IState, queryListType } from "../state/state.types";

interface ITileListUIProps {
  /** The queryList map that is passed in, element at a time, to be rendered by TaskTile */
  queryList: queryListType;
}

function TileListComponent(props: ITileListUIProps) {
  return (
    <div className={QueryTileClassNames.root}>
      <div className={QueryTileClassNames.listContainer}>
        {Object.keys(props.queryList).map(key => (
          <QueryTile query={props.queryList[key]} key={key} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  queryList: state.queryList
});

export const TileListUI = connect(mapStateToProps)(TileListComponent);
