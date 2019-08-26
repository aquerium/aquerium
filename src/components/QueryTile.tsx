import React from "react";
import { Stack, Text, Separator, Link, DefaultButton, Button } from "office-ui-fabric-react";
import { QueryTileClassNames } from "./QueryTile.styles";
import { IQuery } from "../state";

interface IRenderTileProps {
  /** A single IQuery to be rendered. */
  query: IQuery;
}

const gridStackStyle = {
  root: { maxWidth: "100%" }
};

const separatorStyles = {
  root: { background: "transparent", width: 120, horizontalAlign: "center", fontSize: 10 }
};

export const QueryTile = (props: IRenderTileProps): JSX.Element => {
  const { query } = props;

  return (
    <div className={QueryTileClassNames.queryTile}>
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
        <div className={QueryTileClassNames.infoList}>
          <Link href={query.url} className={QueryTileClassNames.basicInfoQueryLink}>
            {query.name}
            <br />
          </Link>
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
          {query.labels && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Labels:</b> [
              {query.labels.map(label => {
                return (
                  <span key={label}>
                    {label}
                    {query.labels && label === query.labels[query.labels.length - 1] ? "" : ", "}
                  </span>
                );
              })}
              ]<br />
            </Text>
          )}
          {query.lastUpdated && (
            <Text className={QueryTileClassNames.basicInfo}>
              <b>Last Updated:</b> {query.lastUpdated} days ago
              <br />
            </Text>
          )}
        </div>
      </button>
    </div>
  );
};
