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
  changeUI: {
    currUI: "Login" | "Home" | "List" | "MakeQuery" | "NotificationSettings" | "EditQuery";
  };
  userInfo: IUserInfo;
}

export interface IUserInfo {
  token: string;
  username: string;
  id: string; // this is the id of the user's gist
}
