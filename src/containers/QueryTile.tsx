import React from "react";
import { IQuery, toQueryList, toggleFlag } from "../state";
import { connect } from "react-redux";
import { Stack, Text, Separator, CommandBarButton } from "office-ui-fabric-react";
import {
  QueryTileClassNames,
  gridStackStyle,
  separatorStyles,
  queryTileFrontStyles
} from "../components/QueryTile.styles";

interface IQueryTileProps {
  /** A single IQuery to be rendered. */
  currQuery: IQuery;
  /** Action creator that sends user to queryListUI. */
  toQueryList: (query: IQuery) => void;
  /** Action creator that toggles the marked as read flag. */
  toggleFlag: (query: IQuery) => void;
  /** The flag determining wh */
}

function QueryTileView(props: IQueryTileProps) {
  const query = props.currQuery;
  function onClickToQueryList() {
    props.toQueryList(query);
  }
  const flagReasonableCount = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>
  ): void => {
    event.stopPropagation();
    console.log(query);
    props.toggleFlag(query);
  };

  return (
    <div className={QueryTileClassNames.queryTile} onClick={onClickToQueryList}>
      <div
        className={
          queryTileFrontStyles(query.reasonableCount, query.tasks.length, query.markedAsRead)
            .queryTile
        }
      >
        <Stack horizontalAlign="center" verticalAlign="space-evenly" styles={gridStackStyle}>
          <Text
            className={
              queryTileFrontStyles(query.reasonableCount, query.tasks.length, query.markedAsRead)
                .queryName
            }
            nowrap
            block
          >
            {query.name}
          </Text>
          <Text
            className={
              queryTileFrontStyles(query.reasonableCount, query.tasks.length, query.markedAsRead)
                .queryTaskCount
            }
          >
            {query.tasks.length.toString()}
          </Text>
        </Stack>
      </div>
      <button className={QueryTileClassNames.queryBack} id="query">
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
          {query.labelsToRender && query.labelsToRender.length > 0 && (
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
          {query.reasonableCount && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Reasonable Count:</b> {query.reasonableCount} open tasks
              <br />
            </Text>
          )}
          {query.tasks.length > query.reasonableCount && (
            <CommandBarButton
              id="This"
              iconProps={{ iconName: "Flag" }}
              text={query.markedAsRead ? "Flag" : "Unflag"}
              onClick={flagReasonableCount}
            />
          )}
        </Stack>
      </button>
    </div>
  );
}

const action = {
  toQueryList,
  toggleFlag
};

export const QueryTile = connect(
  undefined,
  action
)(QueryTileView);
