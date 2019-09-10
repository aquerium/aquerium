import React from "react";
import { QueryTaskClassNames } from "./QueryTaskList.styles";
import { QueryTaskTile } from "./QueryTaskTile";
import { IQuery } from "../state";
import { Text } from "office-ui-fabric-react";

interface IQueryTaskListProps {
  /** The query whose tasks will be rendered. */
  query: IQuery;
}

export const QueryTaskList = (props: IQueryTaskListProps): JSX.Element => {
  const { tasks, customViews } = props.query;
  return (
    <div className={QueryTaskClassNames.root}>
      <div className={QueryTaskClassNames.listContainer}>
        {tasks.length === 0 ? <Text className={QueryTaskClassNames.noQueries}> Nothing to be reported :o </Text> : tasks.map(task => (
          <QueryTaskTile task={task} key={task.repo + task.num} customViews={customViews} />
        ))}
      </div>
    </div>
  );
};
