import React from "react";
import { QueryTile } from "./QueryTile";
import { QueryTileClassNames } from "../components/QueryTile.styles";
import { connect } from "react-redux";
import { IState, queryListType, toEditQuery, IQuery } from "../state";
import { Spinner, SpinnerSize, CommandBarButton, Text, Stack } from "office-ui-fabric-react";
import { getHomeLoadingPhrase } from "../misc/loadingPhrases";

interface IQueryListUIProps {
  /** The queryList map that is passed in, element at a time, to be rendered by QueryTile. */
  queryList: queryListType;
  /** A function linked with the action creator to send the user to the EditQueryUI. */
  toEditQuery: (query?: IQuery) => void;
  /** A boolean that stores whether or not home UI is in loading phase. */
  isHomeLoading: boolean;
}

function QueryListComponent(props: IQueryListUIProps) {

  function onClickToEditQuery() {
    props.toEditQuery();
  };

  return (
    <div className={QueryTileClassNames.root}>
      {!props.isHomeLoading ?
        <div className={QueryTileClassNames.listContainer}>
          {Object.keys(props.queryList).length > 0 ? Object.keys(props.queryList).map(key => (
            <QueryTile currQuery={props.queryList[key]} key={key} />
          )) : <Stack verticalAlign="center"><CommandBarButton iconProps={{ iconName: "Add" }} className={QueryTileClassNames.addButton} onClick={onClickToEditQuery} />
              <Text className={QueryTileClassNames.addAQuery}>Add a query!</Text></Stack>}
        </div>
        : (
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

const actions = {
  toEditQuery
}

export const QueryListUI = connect(mapStateToProps, actions)(QueryListComponent);
