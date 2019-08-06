export interface ITask {
  num: number;
  title: string;
  type: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQuery {
  name: string;
  numTasks: number;
  type?: string;
  state?: string;
  repo?: string;
  assignee?: string;
  author?: string;
  mention?: string;
  reviewStatus?: string;
  labels?: string[];
  stalenessIssue: number;
  stalenessPull: number;
  tasks: ITask[];
}

export interface IState {
  queryList: { [key: string]: IQuery };
}
