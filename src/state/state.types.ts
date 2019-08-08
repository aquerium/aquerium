/**
 * @type { [key: string]: IQuery } queryListType
 * This type defines the queryList, a map from query names to queries
 */
export type queryListType = { [key: string]: IQuery };

/**
 * This interface represents a single task, whether it's an issue or a PR
 *
 * @interface
 */
export interface ITask {
  /**
   * @property { number } num
   * The task number
   * @property { string } title
   * The title of the given task
   * @property { "issue" | "pr" } type
   * Type can only be of "issue" or pull request, "pr"
   * @property { "open" | "closed" } state
   * State of a task only be "open" or "closed"
   * @property { string } createdAt
   * Time stamp for cretion
   * @property { string } updatedAt
   * Time stamp for last update
   */
  num: number;
  title: string;
  type: "issue" | "pr";
  state: "open" | "closed";
  createdAt: string;
  updatedAt: string;
}

/**
 * This interface represents a single query
 *
 * @interface
 */
export interface IQuery {
  /**
   * @property { string } name
   * The name of the query
   * @property { "issue" | "pr" } type
   * State of a task only be "open" or "closed"
   * @property { string } repo
   * OPTIONAL the name of a repository the tasks exist in
   * @property { string } assignee
   * OPTIONAL the assignee of the tasks in the query
   * @property { string } author
   * OPTIONAL the author of the tasks in the query
   * @property { string } mentions
   * OPTIONAL the name of someone mentioned in the tasks in the query
   * @property {   | "No reviews" | "Review required" | "Approved review" | "Changes requested" | "Reviewed by you" | "Awaiting review from you"; } reviewStatus
   * OPTIONAL the current review status for tasks in the query
   * @property { string[] } labels
   * OPTIONAL array of labels further classifying the tasks in the query
   * @property { number } stalenessIssue
   * Number of days before an issue goes stale
   * @property { number } stalenessPull
   * Number of days before a pr goes stale
   * @property { ITask[] } tasks
   * An array of tasks containing the results of the query
   * @property { number } daysSinceUpdate
   * The number of days since the last update on a task
   */
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
  tasks: ITask[];
  daysSinceUpdate: number;
}

/**
 * This interface defines the state object, which currently only stores the queryList
 *
 * @interface
 */
export interface IState {
  /**
   * @property { queryListType } queryList
   * A map of strings(query names) to IQueries
   */
  queryList: queryListType;
}
