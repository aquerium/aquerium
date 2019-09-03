import React from "react";
import { IQuery, toQueryList } from "../state";
import { connect } from "react-redux";
import { Stack, Text, Separator } from "office-ui-fabric-react";
import {
  QueryTileClassNames,
  gridStackStyle,
  separatorStyles
} from "../components/QueryTile.styles";

interface IQueryTileProps {
  /** A single IQuery to be rendered. */
  currQuery: IQuery;
  /** Action creator that sends user to queryListUI. */
  toQueryList: (query: IQuery) => void;
}

function QueryTileView(props: IQueryTileProps) {
  const query = props.currQuery;
  function onClickToQueryList() {
    props.toQueryList(query);
  }
  return (
    <div className={QueryTileClassNames.queryTile} onClick={onClickToQueryList}>
      <div className={QueryTileClassNames.queryFront}>
        <Stack horizontalAlign="center" verticalAlign="space-evenly" styles={gridStackStyle}>
          <Text className={QueryTileClassNames.queryName} nowrap block>
            {query.name}
          </Text>
          <Text className={QueryTileClassNames.queryTaskCount}>
            {query.tasks.length.toString()}
          </Text>
        </Stack>
      </div>
      <button className={QueryTileClassNames.queryBack}>
        <Stack verticalAlign="space-around">
          <Text className={QueryTileClassNames.basicInfoQueryName}>{query.name}</Text>
          <Separator styles={separatorStyles}>{query.tasks.length.toString()} open tasks</Separator>
          <Text className={QueryTileClassNames.basicInfo}>
            <b>Type: </b>
            {query.type
              ? query.type === "pr"
                ? "Pull Requests"
                : "Issues"
              : "Issues and Pull Requests"}
            <br />
          </Text>
          {query.repo && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Repo:</b> {query.repo}
              <br />
            </Text>
          )}
          {query.author && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Author:</b> {query.author}
              <br />
            </Text>
          )}
          {query.assignee && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Assignee:</b> {query.assignee}
              <br />
            </Text>
          )}
          {query.mentions && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Mentions:</b> {query.mentions}
              <br />
            </Text>
          )}
          {query.reviewStatus && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Review Status:</b> {query.reviewStatus}
              <br />
            </Text>
          )}
          {query.labelsToRender && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Labels:</b> {query.labelsToRender.join(", ")}
              <br />
            </Text>
          )}
          {query.lastUpdated && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Last Updated:</b> {query.lastUpdated} days ago
              <br />
            </Text>
          )}
        </Stack>
      </button>
    </div>
  );
}

const action = {
  toQueryList
};

export const QueryTile = connect(
  undefined,
  action
)(QueryTileView);
