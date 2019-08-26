import React from "react";
import { QueryTile } from "./QueryTile";
import { QueryTileClassNames } from "./QueryTile.styles";
import { connect } from "react-redux";
import { IState, queryListType } from "../state/state.types";
import { Spinner } from "office-ui-fabric-react";

interface ITileListUIProps {
  /** The queryList map that is passed in, element at a time, to be rendered by TaskTile. */
  queryList: queryListType;
  isHomeLoading: boolean;
}

function QueryListComponent(props: ITileListUIProps) {
  return (
    <div className={QueryTileClassNames.root}>
      {!props.isHomeLoading ? (
        <div className={QueryTileClassNames.listContainer}>
          {Object.keys(props.queryList).map(key => (
            <QueryTile currQuery={props.queryList[key]} key={key} />
          ))}
        </div>
      ) : (
        <Spinner
          label="Hang on, we're loading your data..."
          size={SpinnerSize.large}
          className={QueryTileClassNames.spinner}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  queryList: state.queryList,
  isHomeLoading: state.changeUI.isHomeLoading
});

export const QueryListUI = connect(mapStateToProps)(QueryListComponent);
