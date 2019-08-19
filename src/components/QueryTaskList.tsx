import React from "react";
import { QueryTaskClassNames } from "./QueryTaskList.ClassNames";
import { QueryTaskTile } from "./QueryTaskTile";
import { ITask } from "../state";

/**
 * @property { queryListType } queryList the queryList map that is passed in, element at a time, to be rendered by TaskTile
 */
interface IQueryTaskListUIProps {
  tasks: ITask[];
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
