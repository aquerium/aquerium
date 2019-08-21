import React from "react";
import { QueryTaskClassNames } from "./QueryTaskList.ClassNames";
import { QueryTaskTile } from "./QueryTaskTile";
import { ITask } from "../state";

interface IQueryTaskListUIProps {
  /** The array of tasks that will be rendered. */
  tasks: ITask[];
  /** The labels, if any, associated with a certain query. */
  labels?: string[];
}

export const QueryTaskList = (props: IQueryTaskListUIProps): JSX.Element => {
  const { tasks, labels } = props;
  return (
    <div className={QueryTaskClassNames.root}>
      <div className={QueryTaskClassNames.listContainer}>
        {tasks.map(task => (
          <QueryTaskTile task={task} labels={labels || []} />
        ))}
      </div>
    </div>
  );
};
