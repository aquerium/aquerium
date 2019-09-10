/**
 * This interface defines the state object.
 */
export interface IState {
  /** A map of strings (query ID's) to IQueries. */
  queryList: queryListType;
  /** Stores information pertaining to the UI being displayed. */
  changeUI: {
    /** Stores the various possible UI's that can be displayed. */
    currUI: "Home" | "Login" | "EditQuery" | "QueryList" | "ErrorPage" | "Loading";
    /** The current query to display if the user is on a UI that needs query info. */
    currQuery?: IQuery;
    /** Stores whether the homeUI is currently loading queries. */
    isHomeLoading: boolean;
    /** An error code that will be sent to the error UI to determine which features will be displayed. */
    errorCode?: number;
  };
  /** Stores a user's personal data. */
  user: IUserInfo;
}

/**
 * This interface represents a single label, with its name and color.
 */
export interface ILabel {
  /** The name of the label. */
  name: string;
  /** The color provided by GitHub and/or a repository. */
  color: string;
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
  labels?: ILabel[];
  /** OPTIONAL The number of days since the last update on a task. */
  lastUpdated?: number;
  /** The number of tasks in a query that, if exceeded, would be considered unreasonable. */
  reasonableCount: number;
  /** An array of tasks containing the results of the query. */
  tasks: ITask[];
  /** The URL for the github page containing this query. */
  url: string;
  /** An array that keeps track of the fields a user wishes to view on the task list tile. */
  customViews: string[];
  /** Decides whether the background of the tile should be red if the reasonable count is exceeded. */
  markedAsRead: boolean;
  /** A custom filter field for users who wish to fully customize a query.  */
  customField?: string;
  /** Determines the sorting type of the query. */
  sorting: "default" | "updated-recent" | "updated-not-recent";
}

/**
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
