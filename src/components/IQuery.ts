import { ITask } from "./ITask";

export interface IQuery {
  name: string;
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
