import React from "react";
import { QueryTile } from "./QueryTile";
import { QueryTileClassNames } from "../components/QueryTile.styles";
import { connect } from "react-redux";
import { IState, queryListType } from "../state/state.types";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import { getHomeLoadingPhrase } from "../misc/loadingPhrases";

interface IQueryListUIProps {
  /** The queryList map that is passed in, element at a time, to be rendered by QueryTile. */
  queryList: queryListType;
  /** A boolean that stores whether or not home UI is in loading phase. */
  isHomeLoading: boolean;
}

function QueryListComponent(props: IQueryListUIProps) {
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
            label={getHomeLoadingPhrase()}
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
