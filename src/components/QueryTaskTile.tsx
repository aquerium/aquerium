import React from "react";
import { ITask } from "../state/state.types";
import { QueryTaskClassNames } from "./QueryTaskList.styles";
import { Stack, Text, TooltipHost, getId } from "office-ui-fabric-react";
import { description } from "./InfoButton";

interface IQueryTaskTile {
  /** A single ITask to be rendered. */
  task: ITask;
}

const gridStackStyle = {
  root: { width: "100%" }
};

export const QueryTaskTile = (props: IQueryTaskTile): JSX.Element => {
  const { task } = props;
  const hostId = getId("titleTooltipHost");
  const calloutGapSpace = { gapSpace: 0, fontSize: 16 };
  const taskInfo = "Type: " + task.type + ", Last updated: " + task.updatedAt;

  return (
    <Stack horizontal verticalAlign="space-between" className={QueryTaskClassNames.taskTile}>
      <Stack horizontalAlign="start" styles={gridStackStyle}>
        <TooltipHost content={task.title} id={hostId} calloutProps={calloutGapSpace}>
          <a
            href={task.url}
            target="_blank"
            className={QueryTaskClassNames.taskTitle}
            aria-labelledby={hostId}
          >
            {task.title}
          </a>
        </TooltipHost>
        <Text className={QueryTaskClassNames.basicInfo} nowrap block>
          #{task.num} opened {task.createdAt} by {task.author}
        </Text>
      </Stack>
      <div className={QueryTaskClassNames.infoIcon}>{description(taskInfo)()}</div>
    </Stack>
  );
};
