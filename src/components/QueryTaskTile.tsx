import React from "react";
import { ITask } from "../state/state.types";
import { QueryTaskClassNames } from "../containers/QueryTaskList.styles";
import { Stack, Text, Link, TooltipHost, getId } from "office-ui-fabric-react";
import { description } from "./InfoButton";

interface IQueryTaskTile {
  /** A single ITask to be rendered. */
  task: ITask;
  /** A list of labels to be listed. */
  labels: string[];
}

const gridStackStyle = {
  root: { width: "100%" }
};

export const QueryTaskTile = (props: IQueryTaskTile): JSX.Element => {
  const { task, labels } = props;
  const hostId = getId("titleTooltipHost");
  const calloutGapSpace = { gapSpace: 0 };
  const taskInfo = ["Type: " + task.type, "Last updated: " + task.updatedAt];

  return (
    <Stack horizontal verticalAlign="space-between" className={QueryTaskClassNames.taskTile}>
      <Stack horizontalAlign="start" styles={gridStackStyle}>
        <TooltipHost
          content={task.title}
          styles={{ root: { display: "inline-block" } }}
          id={hostId}
          calloutProps={calloutGapSpace}
        >
          <Link className={QueryTaskClassNames.taskTitle} aria-labelledby={hostId}>
            <Text nowrap block>
              {task.title}
            </Text>
          </Link>
        </TooltipHost>
        <Text className={QueryTaskClassNames.basicInfo} nowrap block>
          #{task.num} opened {task.createdAt} by {task.author}
        </Text>
      </Stack>
      <div className={QueryTaskClassNames.infoIcon}>{description(taskInfo)()}</div>
    </Stack>
  );
};
