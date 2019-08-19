import * as React from "react";
import { IQuery } from "../state";
import { QueryTaskListNavBar } from "./QueryTaskTileNavBar";
import { QueryTaskList } from "./QueryTaskList";

interface IQueryTaskListUIProps {
  currQuery: IQuery;
}

export class QueryTaskListUI extends React.Component<IQueryTaskListUIProps> {
  public render = (): JSX.Element => {
    const { currQuery } = this.props;
    return (
      <>
        <QueryTaskListNavBar title={currQuery.name} />
        <QueryTaskList tasks={currQuery.tasks} labels={currQuery.labels} />
      </>
    );
  };
}

export default QueryTaskListUI;
