import { IQuery, ITask } from "../state";
import { IUserInfo } from "./api";
import * as fetch from "isomorphic-fetch";

/**
 * Returns the list of tasks representing the result of a specific query
 * @param url API endpoint for a specific query
 */
export async function getQueryTasks(url: string): Promise<{ items?: ITask[]; errorCode?: number }> {
  const response = await fetch(url);
  if (!response.ok) {
    return { errorCode: response.status };
  }
  const responseText = await response.text();
  const { items = [] } = JSON.parse(responseText);
  return { items: items };
}

/**
 * Constructs the API endpoint given a specific query
 * @param user IUserInfo object with the user's relevant information
 * @param query IQuery object
 */
export function getQueryURL(user: IUserInfo, query: IQuery): string {
  let qualifiers = "";
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

  return "https://api.github.com/search/issues?q=" + qualifiers;
}

/**
 * Constructs the qualifier string for reviewStatus
 * @param reviewStatus User's input for review status
 * @param username User's GitHub username
 */
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
