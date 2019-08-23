import React from "react";
import { QueryTile } from "../components/QueryTile";
import { QueryTileClassNames } from "../components/QueryTile.styles";
import { connect } from "react-redux";
import { IState, queryListType } from "../state/state.types";

interface ITileListUIProps {
  /** The queryList map that is passed in, element at a time, to be rendered by TaskTile */
  queryList: queryListType;
}

function QueryListComponent(props: ITileListUIProps) {
  return (
    <div className={QueryTileClassNames.root}>
      <div className={QueryTileClassNames.listContainer}>
        {/* {Object.keys(props.queryList).map(key => (
          <QueryTile query={props.queryList[key]} key={key} />
        ))} */}
        <QueryTile
          query={{
            id: "asd",
            name: "Woohoo",
            type: "issue",
            repo: "OfficeDev/office-ui-fabric-react",
            assignee: "kkjeer",
            url: "www.github.com",
            labels: ["Component: Overlay"],
            stalenessIssue: 10,
            stalenessPull: 10,
            tasks: []
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  queryList: state.queryList
});

export const QueryListUI = connect(mapStateToProps)(QueryListComponent);
