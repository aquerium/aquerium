import * as React from "react";
import { IQuery } from "../state";
import { QueryTaskListNavBar } from "./QueryTaskTileNavBar";
import { QueryTaskList } from "./QueryTaskList";

interface IQueryTaskListUIProps {
  /** The current query whose tasks are to be rendered. */
  currQuery: IQuery;
}

export const QueryTaskListUI = (props: IQueryTaskListUIProps): JSX.Element => {
  return (
    <>
      <QueryTaskListNavBar query={props.currQuery} />
      <QueryTaskList query={props.currQuery} />
    </>
  );
};

export default QueryTaskListUI;
