import { IQuery, ITask, IUserInfo } from "../state";
import { IIssue, IPull } from "./github";
import { getOctokit } from "./api";
import { QUERY_TASK_LIMIT } from "./constants"

/**
 * Converts and returns the list of tasks representing the result of a specific query.
 * @param user Contains the user's relevant information.
 * @param query Query to get the list of tasks for.
 */
export async function getQueryTasks(
  user: IUserInfo,
  query: IQuery
): Promise<{ tasks?: ITask[]; errorCode?: number }> {
  try {
    const octokit = getOctokit(user.token);
    var fullQuery = "";
    if (!query.customField || query.customField === "") {
      fullQuery = getQualifiersStr(user, query);
    } else {
      fullQuery = query.customField;
    }
    const options = octokit.search.issuesAndPullRequests.endpoint.merge({
      q: fullQuery
    });
    const response = await octokit.paginate(options);
    if (response.length > QUERY_TASK_LIMIT) {
      return { errorCode: -1 };
    }
    const tasks: ITask[] = [];
    response.forEach(function (item: IIssue | IPull) {
      const task: ITask = {
        num: item.number,
        title: item.title,
        type: item.hasOwnProperty("pull_request") ? "pr" : "issue",
        createdAt: item.created_at.substring(0, 10),
        updatedAt: item.updated_at.substring(0, 10),
        url: item.html_url,
        repo: item.repository_url.split("https://api.github.com/repos/")[1],
        author: item.user.login,
        assignees: item.assignees.map(assignee => assignee.login),
        labels: item.labels.map(({ name, color }) => ({
          name,
          color
        }))
      };
      tasks.push(task);
    });
    return { tasks: tasks };
  } catch (error) {
    console.error(error);
    return { errorCode: 500 };
  }
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

/**
 * Generate a unque id for the query.
 */
export const createUid = (): string => {
  return Math.random()
    .toString(36)
    .substring(2, 15);
};

function getQualifiersStr(user: IUserInfo, query: IQuery): string {
  let qualifiers = "is:open";
  qualifiers += query.type ? "+is:" + query.type : "";
  qualifiers += query.repo ? "+repo:" + query.repo : "";
  qualifiers += query.assignee ? "+assignee:" + query.assignee : "";
  qualifiers += query.author ? "+author:" + query.author : "";
  qualifiers += query.mentions ? "+mentions:" + query.mentions : "";
  qualifiers += query.reviewStatus ? getReviewString(query.reviewStatus, user.username) : "";
  qualifiers += (query.sorting !== "default") ? ("+sort:updated" + ((query.sorting === "updated-recent") ? "-desc" : "-asc")) : "";
  if (query.labels) {
    query.labels.forEach(function (label) {
      qualifiers += '+label:"' + label.name.replace(/"/g, '\\"') + '"';
    });
  }
  qualifiers += query.lastUpdated ? "+updated:<=" + getRefDate(query.lastUpdated) : "";
  return qualifiers;
}

function getReviewString(reviewStatus: string, username: string): string {
  switch (reviewStatus) {
    case "No reviews":
      return "+review:none";
    case "Review required":
      return "+review:required";
    case "Approved review":
      return "+review:approved";
    case "Changes requested":
      return "+review:changes_requested";
    case "Reviewed by you":
      return "+reviewed-by:" + username;
    case "Awaiting review from you":
      return "+reviewed-requested:" + username;
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
 * Takes in a url string and, if emojis/characters are present, ensures a valid URL
 * with the correct URL encoding.
 * @param queryUrl The URL to a given GitHub query.
 */
export const normalizedURL = (queryUrl: string): string => {
  // Inspired by the solution on:
  // https://meta.stackexchange.com/questions/285366/emoji-in-url-breaks-insert-hyperlink-tool-in-editor.
  var m = /^\s*(.*?)(?:\s+"(.*)")?\s*$/.exec(queryUrl);
  let normalized = "";
  if (m) {
    let url = m[1];
    normalized = url.replace(/%(?:[\da-fA-F]{2})|[^\w\d\-./[\]%?+]+/g, function (match) {
      if (match.length === 3 && match.charAt(0) === "%") return match;
      else return encodeURI(match);
    });
  }
  return normalized;
};

