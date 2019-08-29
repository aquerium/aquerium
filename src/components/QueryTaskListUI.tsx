import * as React from "react";
import { IQuery } from "../state";
import { QueryTaskListNavBar } from "./QueryTaskTileNavBar";
import { QueryTaskList } from "./QueryTaskList";

interface IQueryTaskListUIProps {
  /** The current query whose tasks are to be rendered. */
  currQuery: IQuery;
  /** The fields a user wishes to prioritize when vieiwing a task list. */
  customViews: string[];
}

export const QueryTaskListUI = (props: IQueryTaskListUIProps): JSX.Element => {
  return (
    <>
      <QueryTaskListNavBar query={props.currQuery} />
      <QueryTaskList query={props.currQuery} customViews={props.customViews} />
    </>
  );
};

export default QueryTaskListUI;
