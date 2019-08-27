import { IQuery, ITask, IUserInfo } from "../state";
import { IIssue, IPull } from "./github";
import fetch from "isomorphic-fetch";

/**
 * Converts and returns the list of tasks representing the result of a specific query.
 * @param url API endpoint for a specific query.
 */
export async function getQueryTasks(url: string): Promise<{ tasks?: ITask[]; errorCode?: number }> {
  const response = await fetch(url);
  if (!response.ok) {
    return { errorCode: response.status };
  }
  const responseText = await response.text();
  const { items = [] } = JSON.parse(responseText);

  const tasks: ITask[] = [];
  items.forEach(function(item: IIssue | IPull) {
    const task: ITask = {
      num: item.number,
      title: item.title,
      type: item.hasOwnProperty("pull_request") ? "pr" : "issue",
      state: "open",
      createdAt: item.created_at.substring(0, 10),
      updatedAt: item.updated_at.substring(0, 10),
      url: item.html_url,
      repo: item.repository_url.split("https://api.github.com/repos/")[1],
      author: item.user.login
    };
    tasks.push(task);
  });
  return { tasks: tasks };
}

/**
 * Constructs the API endpoint given a specific query.
 * @param user Contains the user's relevant information.
 * @param query Query to get the endpoint URL for.
 */
export function getQueryURLEndpoint(user: IUserInfo, query: IQuery): string {
  return "https://api.github.com/search/issues?q=" + getQualifiersStr(user, query);
}

/**
 * Constructs the friendly HTML URL given a specific query.
 * @param user Contains the user's relevant information.
 * @param query Query to get the HTML URL for.
 */
export function getQueryURLHTML(user: IUserInfo, query: IQuery): string {
  return (
    "https://github.com/" +
    (query.repo ? query.repo + "/" : "") +
    "issues?q=" +
    getQualifiersStr(user, query)
  );
}

function getQualifiersStr(user: IUserInfo, query: IQuery): string {
  let qualifiers = "%20is:open";
  qualifiers += query.type ? "%20is:" + query.type : "";
  qualifiers += query.repo ? "%20repo:" + query.repo : "";
  qualifiers += query.assignee ? "%20assignee:" + query.assignee : "";
  qualifiers += query.author ? "%20author:" + query.author : "";
  qualifiers += query.mentions ? "%20mentions:" + query.mentions : "";
  qualifiers += query.reviewStatus ? getReviewString(query.reviewStatus, user.username) : "";
  if (query.labels) {
    query.labels.forEach(function(label) {
      qualifiers += "%20label:%22" + label + "%22";
    });
  }
  qualifiers += query.lastUpdated ? "%20updated:<=" + getRefDate(query.lastUpdated) : "";
  return qualifiers;
}

function getReviewString(reviewStatus: string, username: string): string {
  switch (reviewStatus) {
    case "No reviews":
      return "%20review:none";
    case "Review required":
      return "%20review:required";
    case "Approved review":
      return "%20review:approved";
    case "Changes requested":
      return "%20review:changes_requested";
    case "Reviewed by you":
      return "%20reviewed-by:" + username;
    case "Awaiting review from you":
      return "%20reviewed-requested:" + username;
    default:
      return "";
  }
}

function getRefDate(daysRef: number): string {
  const nowDate = new Date();
  const milliseconds = nowDate.getTime() - daysRef * 24 * 60 * 60 * 1000;

  const dateRef = new Date(milliseconds);
  const dd = dateRef.getDate();
  const mm = dateRef.getMonth() + 1;

  const ddStr = dd < 10 ? "0" + dd : dd;
  const mmStr = mm < 10 ? "0" + mm : mm;

  return dateRef.getFullYear() + "-" + mmStr + "-" + ddStr;
}

/**
 * Generate a unque id for the query.
 */
export const createUid = (): string => {
  return Math.random()
    .toString(36)
    .substring(2, 15);
};
