import React from "react";
import { QueryTaskClassNames } from "./QueryTaskList.styles";
import { QueryTaskTile } from "./QueryTaskTile";
import { IQuery } from "../state";

interface IQueryTaskListProps {
  /** The query whose tasks will be rendered. */
  query: IQuery;
  /** The fields a user wishes to prioritize when vieiwing a task list. */
  customViews: string[];
}

export const QueryTaskList = (props: IQueryTaskListProps): JSX.Element => {
  const { query } = props;
  const { tasks } = query;
  return (
    <div className={QueryTaskClassNames.root}>
      <div className={QueryTaskClassNames.listContainer}>
        {tasks.map(task => (
          <QueryTaskTile task={task} key={task.repo + task.num} customViews={props.customViews} />
        ))}
      </div>
    </div>
  );
};
