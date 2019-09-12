import React from "react";
import { ITask } from "../state/state.types";
import { QueryTaskClassNames } from "./QueryTaskList.styles";
import { Stack, Text, TooltipHost, getId, Link } from "office-ui-fabric-react";
import emoji from "node-emoji"; // Emoji object to help render emojis correctly throughout the app.
import { gitLabelStyles } from "./GitLabel.styles";

interface IQueryTaskTile {
  /** A single ITask to be rendered. */
  task: ITask;
  /** An array that keeps track of the fields a user wishes to view on the task list tile. */
  customViews: string[];
}

export const QueryTaskTile = (props: IQueryTaskTile): JSX.Element => {
  const { task, customViews } = props;
  const emojifiedLabels = task.labels
    ? task.labels.map(label => (
      <span className={gitLabelStyles(label.color).label} key={label.name + label.color}>
        {emoji.emojify(label.name)}
      </span>
    ))
    : null;
  const hostId = getId("titleTooltipHost");
  const calloutGapSpace = { gapSpace: 0, fontSize: 16 };
  const options = ["type", "author", "repo", "createdAt", "lastUpdated", "assignees", "labels"];
  const optionIndices = new Map();
  for (const option of options) {
    optionIndices.set(option, customViews.indexOf(option));
  }

  const renderInfoElement = (
    prop: string,
    info: string | JSX.Element[] | null,
    beforeText?: string,
    afterText?: string
  ) => {
    return optionIndices.get(prop) > -1 ? (
      <span>
        {beforeText}
        <b>
          {(prop === "labels" || prop === "assignees" || prop === "lastUpdated") &&
            (!info || info.length === 0)
            ? "None yet"
            : info}
        </b>
        {afterText}
      </span>
    ) : null;
  };

  return (
    <Stack verticalAlign="space-between" className={QueryTaskClassNames.taskTile}>
      <div className={QueryTaskClassNames.titleAndInfoIcon}>
        <TooltipHost content={task.title} id={hostId} calloutProps={calloutGapSpace}>
          <Link
            href={task.url}
            target="_blank"
            rel="noopener noreferrer"
            className={QueryTaskClassNames.taskTitle}
            aria-labelledby={hostId}
          >
            {task.title}
          </Link>
        </TooltipHost>
      </div>
      <Stack
        verticalAlign="space-around"
        horizontalAlign="start"
        className={QueryTaskClassNames.taskInfoElement}
      >
        {(optionIndices.get("type") > -1 ||
          optionIndices.get("author") > -1 ||
          optionIndices.get("repo") > -1) && (
            <Text className={QueryTaskClassNames.basicInfo} nowrap block>
              #{task.num} {renderInfoElement("type", task.type, " (", ") ")}
              {renderInfoElement("author", task.author, "by ", " ")}
              {renderInfoElement("repo", task.repo, "in ", " ")}
            </Text>
          )}
        {(optionIndices.get("createdAt") > -1 || optionIndices.get("lastUpdated") > -1) && (
          <Text className={QueryTaskClassNames.basicInfo} nowrap block>
            {renderInfoElement("createdAt", task.createdAt, "Opened: ", " ")}
            {renderInfoElement("lastUpdated", task.updatedAt, "Last updated: ")}
          </Text>
        )}
        {(optionIndices.get("assignees") > -1 || optionIndices.get("labels") > -1) && (
          <Text className={QueryTaskClassNames.labels} nowrap block>
            {renderInfoElement("assignees", task.assignees.join(", "), "Assigned to: ", " ")}
            {renderInfoElement("labels", emojifiedLabels, "Labels: ")}
          </Text>
        )}
      </Stack>
    </Stack>
  );
};
