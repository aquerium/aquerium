/**
 * @interface
 * This interface defines the state object.
 */
export interface IState {
  /** A map of strings (query ID's) to IQueries. */
  queryList: queryListType;
  /** Stores information pertaining to the UI being displayed. */
  changeUI: {
    currUI: "Home" | "Login" | "EditQuery" | "QueryList";
    currQuery?: IQuery;
  };
  /** Stores a user's personal data. */
  user: IUserInfo;
}

/**
 * @interface
 * This interface represents a single label, withc its name and color.
 */
export interface ILabel {
  /** The name of the label. */
  name: string;
  /** The color provided by GitHub and/or a repository. */
  color: string;
}

/**
 * @interface
 * This interface represents a single task, whether it's an issue or a PR.
 */
export interface ITask {
  /** The task number. */
  num: number;
  /** The title of the given task. */
  title: string;
  /** Person who opened this task. */
  author: string;
  /** The assignees of the task. */
  assignees: string[];
  /** The repo the task is a member of. */
  repo: string;
  /** Type can only be of "issue" or pull request, "pr". */
  type: "issue" | "pr";
  /** Array of labels further classifying the task. */
  labels: ILabel[];
  /** Time stamp for creation. */
  createdAt: string;
  /** Time stamp for last update. */
  updatedAt: string;
  /** The HTML URL for this task. */
  url: string;
}

/**
 *
 * This interface represents a single query.
 */
export interface IQuery {
  /** The unique id of a query. */
  id: string;
  /** The name of the query. */
  name: string;
  /** The type of tasks in the query, being issue, PR or both. */
  type?: "issue" | "pr";
  /** OPTIONAL The name of a repository the tasks exist in. */
  repo?: string;
  /** OPTIONAL The assignee of the tasks in the query. */
  assignee?: string;
  /** OPTIONAL The author of the tasks in the query. */
  author?: string;
  /** OPTIONAL The name of someone mentioned in the tasks in the query. */
  mentions?: string;
  /** OPTIONAL The current review status for tasks in the query. */
  reviewStatus?:
    | "No reviews"
    | "Review required"
    | "Approved review"
    | "Changes requested"
    | "Reviewed by you"
    | "Awaiting review from you";
  /** OPTIONAL Array of labels further classifying the tasks in the query. */
  labels?: string[];
  /** The array of labels that are rendered across the app. */
  labelsToRender: string[];
  /** Number of days before an issue goes stale. */
  stalenessIssue: number;
  /** Number of days before a pr goes stale. */
  stalenessPull: number;
  /** OPTIONAL The number of days since the last update on a task. */
  lastUpdated?: number;
  /** An array of tasks containing the results of the query. */
  tasks: ITask[];
  /** The URL for the github page containing this query. */
  url: string;
  /** An array that keeps track of the fields a user wishes to view on the task list tile. */
  customViews: string[];
}

/**
 * @interface
 * Contains relevant information for the authenticated user.
 */
export interface IUserInfo {
  /** User's GitHub personal access token. */
  token: string;
  /** User's GitHub username. */
  username: string;
  /** ID of user's gist (for Aquerium). */
  gistID: string;
  /** Stores whether the user's PAT entered was invalid. */
  invalidPAT: boolean;
}

// This type defines the queryList, a map from query ID's to queries.
export type queryListType = { [id: string]: IQuery };
