/**
 * @interface
 * This interface defines the state object
 *
 * @property { queryListType } queryList a map of strings (query ID's) to IQueries
 * @property { object } changeUI stores a string containing the current UI
 * @property { object } user stores a user's personal data
 */
export interface IState {
  queryList: queryListType;
  changeUI: {
    currUI: "Home" | "Login" | "EditQuery" | "QueryList";
  };
  user: IUserInfo;
}

/**
 * @interface
 * This interface represents a single task, whether it's an issue or a PR
 *
 * @property { number } num the task number
 * @property { string } title the title of the given task
 * @property { "issue" | "pr" } type type can only be of "issue" or pull request, "pr"
 * @property { "open" | "closed" } state state of a task only be "open" or "closed"
 * @property { string } createdAt time stamp for creation
 * @property { string } updatedAt time stamp for last update
 */
export interface ITask {
  num: number;
  title: string;
  type: "issue" | "pr";
  state: "open" | "closed";
  createdAt: string;
  updatedAt: string;
}

/**
 * @interface
 * This interface represents a single query
 *
 * @property { string } id the unique id of a query
 * @property { string } name the name of the query
 * @property { "issue" | "pr" } type the type of tasks in the query, being issue, PR or both
 * @property { string } repo OPTIONAL the name of a repository the tasks exist in
 * @property { string } assignee  OPTIONAL the assignee of the tasks in the query
 * @property { string } author OPTIONAL the author of the tasks in the query
 * @property { string } mentions OPTIONAL the name of someone mentioned in the tasks in the query
 * @property { "No reviews" | "Review required" | "Approved review" | "Changes requested" | "Reviewed by you" | "Awaiting review from you"; } reviewStatus OPTIONAL the current review status for tasks in the query
 * @property { string[] } labels OPTIONAL array of labels further classifying the tasks in the query
 * @property { number } stalenessIssue Number of days before an issue goes stale
 * @property { number } stalenessPull number of days before a pr goes stale
 * @property { number } lastUpdated OPTIONAL the number of days since the last update on a task
 * @property { ITask[] } tasks an array of tasks containing the results of the query
 */
export interface IQuery {
  id: string;
  name: string;
  type?: "issue" | "pr";
  repo?: string;
  assignee?: string;
  author?: string;
  mentions?: string;
  reviewStatus?:
    | "No reviews"
    | "Review required"
    | "Approved review"
    | "Changes requested"
    | "Reviewed by you"
    | "Awaiting review from you";
  labels?: string[];
  stalenessIssue: number;
  stalenessPull: number;
  lastUpdated?: number;
  tasks: ITask[];
}

/**
 * Contains relevant information for the authenticated user
 */
export interface IUserInfo {
  token: string /*user's GitHub personal access token */;
  username: string /* User's GitHub username */;
  gistID: string /* ID of user's gist (for Aquerium) */;
}

/**
 * @type { [id: string]: IQuery } this type defines the queryList, a map from query ID's to queries
 */
export type queryListType = { [id: string]: IQuery };
