import React from "react";
import { ITask } from "../state/state.types";
import { QueryTaskClassNames } from "./QueryTaskList.styles";
import { Stack, Text, TooltipHost, getId } from "office-ui-fabric-react";
import { description } from "./InfoButton";
import { emoji } from "../util";

interface IQueryTaskTile {
  /** A single ITask to be rendered. */
  task: ITask;
  /** An array that keeps track of the fields a user wishes to view on the task list tile. */
  customViews: any[];
}

export const QueryTaskTile = (props: IQueryTaskTile): JSX.Element => {
  const { task, customViews } = props;
  const hostId = getId("titleTooltipHost");
  const calloutGapSpace = { gapSpace: 0, fontSize: 16 };
  const options = ["type", "author", "repo", "createdAt", "lastUpdated", "assignees", "labels"];
  let optionIndices = new Map();
  for (let option of options) {
    optionIndices.set(option, customViews.indexOf(option));
  }

  const taskInfo = (): any[] => {
    const { task } = props;
    let taskInfo: any[] = [
      <span>
        Type: <b>{task.type}</b>
      </span>,
      <span>
        Repo: <b>{task.repo}</b>
      </span>,
      <span>
        Author: <b>{task.author}</b>
      </span>,
      <span>
        Created: <b>{task.createdAt}</b>
      </span>,
      <span>
        Last updated: <b>{task.updatedAt}</b>
      </span>
    ];
    if (task.assignees.length > 0) {
      taskInfo.push(
        <span>
          Assigned to: <b>{task.assignees.join(", ")}</b>
        </span>
      );
    }
    if (task.labels.length > 0) {
      taskInfo.push(
        <span>
          Labels: [<b>{task.labels.map(label => emoji.emojify(label)).join(", ")}</b>]
        </span>
      );
    }
    return taskInfo;
  };

  const renderInfoElement = (index: number, info: any, beforeText?: string, afterText?: string) => {
    return index > -1 ? (
      <span>
        {beforeText}
        <b>{info}</b>
        {afterText}
      </span>
    ) : null;
  };

  return (
    <Stack verticalAlign="space-between" className={QueryTaskClassNames.taskTile}>
      <div className={QueryTaskClassNames.titleAndInfoIcon}>
        <TooltipHost content={task.title} id={hostId} calloutProps={calloutGapSpace}>
          <a
            href={task.url}
            target="_blank"
            rel="noopener noreferrer"
            className={QueryTaskClassNames.taskTitle}
            aria-labelledby={hostId}
          >
            {task.title}
          </a>
        </TooltipHost>
        <div className={QueryTaskClassNames.infoIcon}>{description(taskInfo())()}</div>
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
            #{task.num} {renderInfoElement(optionIndices.get("type"), task.type, " (", ") ")}
            {renderInfoElement(optionIndices.get("author"), task.author, "by ", " ")}
            {renderInfoElement(optionIndices.get("repo"), task.repo, "in ", " ")}
          </Text>
        )}
        {(optionIndices.get("createdAt") > -1 || optionIndices.get("lastUpdated") > -1) && (
          <Text className={QueryTaskClassNames.basicInfo} nowrap block>
            {renderInfoElement(optionIndices.get("createdAt"), task.createdAt, "Opened: ", " ")}
            {renderInfoElement(optionIndices.get("lastUpdated"), task.updatedAt, "Last updated: ")}
          </Text>
        )}
        {(optionIndices.get("assignees") > -1 || optionIndices.get("labels") > -1) && (
          <Text className={QueryTaskClassNames.basicInfo} nowrap block>
            {renderInfoElement(
              optionIndices.get("assignees"),
              task.assignees.join(", "),
              "Assigned to: [",
              "] "
            )}
            {renderInfoElement(
              optionIndices.get("labels"),
              task.labels.map(label => emoji.emojify(label)).join(", "),
              "With Labels: [",
              "]"
            )}
          </Text>
        )}
      </Stack>
    </Stack>
  );
};
