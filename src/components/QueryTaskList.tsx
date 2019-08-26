import React from "react";
import { QueryTaskClassNames } from "./QueryTaskList.styles";
import { QueryTaskTile } from "./QueryTaskTile";
import { ITask, IQuery } from "../state";

interface IQueryTaskListProps {
  /** The query whose tasks will be rendered. */
  query: IQuery;
}

export const QueryTaskList = (props: IQueryTaskListProps): JSX.Element => {
  const { query } = props;
  const { tasks, labels } = query;
  return (
    <div className={QueryTaskClassNames.root}>
      <div className={QueryTaskClassNames.listContainer}>
        {tasks.map(task => (
          <QueryTaskTile task={task} labels={labels || []} key={task.repo + task.num} />
        ))}
      </div>
    </div>
  );
};
