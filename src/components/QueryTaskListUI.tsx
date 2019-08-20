import * as React from "react";
import { IQuery } from "../state";
import { QueryTaskListNavBar } from "./QueryTaskTileNavBar";
import { QueryTaskList } from "./QueryTaskList";

interface IQueryTaskListUIProps {
  currQuery: IQuery;
}

export const QueryTaskListUI = (props: IQueryTaskListUIProps): JSX.Element => {
  return (
    <>
      <QueryTaskListNavBar query={props.currQuery} />
      <QueryTaskList tasks={props.currQuery.tasks} labels={props.currQuery.labels} />
    </>
  );
};

export default QueryTaskListUI;
