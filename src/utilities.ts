import { IQuery, ITask } from "./state";
import { IUserInfo } from "./api";
import fetch from "isomorphic-fetch";

/**
 * Represents an issue item in GitHub's API.
 */
interface IIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  labels: [
    { id: number; node_id: string; url: string; name: string; color: string; default: boolean }
  ];
  state: string;
  locked: boolean;
  assignee: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  assignees: [
    {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
    }
  ];
  milestone: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  body: string;
  score: number;
}

/**
 * Represents a pull request item in GitHub's API.
 */
interface IPull {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  labels: [
    { id: number; node_id: string; url: string; name: string; color: string; default: boolean }
  ];
  state: string;
  locked: boolean;
  assignee: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  assignees: [
    {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
    }
  ];
  milestone: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
  };
  body: string;
  score: number;
}

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
      updatedAt: item.updated_at.substring(0, 10)
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

/**
 * Constructs the qualifier string for review status.
 * @param reviewStatus User's input for review status.
 * @param username User's GitHub username.
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
