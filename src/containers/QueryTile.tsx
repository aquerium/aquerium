import React from "react";
import { IQuery, toQueryList, toggleFlag } from "../state";
import { connect } from "react-redux";
import { Stack, Text, Separator, CommandBarButton } from "office-ui-fabric-react";
import {
  QueryTileClassNames,
  gridStackStyle,
  separatorStyles,
  queryTileFrontStyles,
  flagIconStyles,
  flagIconProps,
  copyIconStyles,
  copyIconProps
} from "../components/QueryTile.styles";
import { gitLabelStyles } from "../components/GitLabel.styles";
import emoji from "node-emoji";

interface IQueryTileProps {
  /** A single IQuery to be rendered. */
  currQuery: IQuery;
  /** Action creator that sends user to queryListUI. */
  toQueryList: (query: IQuery) => void;
  /** Action creator that toggles the marked as read flag. */
  toggleFlag: (query: IQuery) => void;
}

function QueryTileView(props: IQueryTileProps) {
  const query = props.currQuery;
  const emojifiedAndColoredLabels = query.labels
    ? query.labels.map(label => (
      <span className={gitLabelStyles(label.color).label} key={label.name + label.color}>
        {emoji.emojify(label.name)}
      </span>
    ))
    : null;

  function onClickToQueryList() {
    props.toQueryList(query);
  }

  // Lifted from MDN docs.
  async function updateClipboard() {
    navigator.clipboard.writeText((query.customField && query.customField !== "") ? query.customField : "Invalid Query").then(function () {
      // Copy successful.
    }, function () {
      // Copy unsuccessful, do nothing.
    });
  }

  const flagReasonableCount = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>
  ): void => {
    event.stopPropagation();
    props.toggleFlag(query);
  };

  const copyQuery = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>
  ): void => {
    event.stopPropagation();
    updateClipboard();
  };

  const frontTileStyles = queryTileFrontStyles(
    query.reasonableCount,
    query.tasks.length,
    query.markedAsRead
  );

  const reasonableCountDiff = Math.max(query.tasks.length - query.reasonableCount, 0);

  return (
    <div className={QueryTileClassNames.queryTile} onClick={onClickToQueryList}>
      <div className={frontTileStyles.queryTile}>
        <Stack horizontalAlign="center" verticalAlign="space-evenly" styles={gridStackStyle}>
          <Text className={frontTileStyles.queryName} nowrap block>
            {query.name}
          </Text>
          <Text className={frontTileStyles.queryTaskCount}>{query.tasks.length.toString()}</Text>
        </Stack>
      </div>
      <button id="QueryBack" className={QueryTileClassNames.queryBack} onClick={onClickToQueryList}>
        <Stack verticalAlign="space-around">
          {query.customField && <CommandBarButton
            id="Copy"
            iconProps={copyIconProps}
            text={"Copy Query"}
            onClick={copyQuery}
            styles={copyIconStyles}
          />}
          <Text className={QueryTileClassNames.basicInfoQueryName}>{query.name}</Text>
          <Separator styles={separatorStyles}>
            {query.tasks.length.toString()} open {query.tasks.length === 1 ? "task" : "tasks"}
          </Separator>
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
          {query.labels && query.labels.length > 0 && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Labels:</b> {emojifiedAndColoredLabels}
              <br />
            </Text>
          )}
          {query.lastUpdated && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Last Updated:</b> {query.lastUpdated} {query.lastUpdated === 1 ? "day" : "days"} ago
              <br />
            </Text>
          )}
          {
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Reasonable Count:</b>{" "}
              {reasonableCountDiff > 0
                ? "Exceeded by " +
                reasonableCountDiff +
                (reasonableCountDiff === 1 ? " task" : " tasks")
                : "Not Exceeded"}
              <br />
            </Text>
          }
          {query.tasks.length > query.reasonableCount && (
            <CommandBarButton
              id="Flag"
              iconProps={flagIconProps}
              text={query.markedAsRead ? "Flag" : "Unflag"}
              onClick={flagReasonableCount}
              styles={flagIconStyles}
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
