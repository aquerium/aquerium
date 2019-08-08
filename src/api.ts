import * as fetch from "isomorphic-fetch";
import { getQueryResult, getQueryTasks } from "./utilities";

export interface IUserInfo {
  token: string;
  username: string;
  gistID: string;
}

export interface ITask {
  number: number;
  title: string;
  type: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQuery {
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
}

export interface IGist {
  description: string;
  public: boolean;
  files: {
    [key: string]: {
      content: string;
    };
  };
}

export async function createGist(
  token: string,
  data: IGist
): Promise<{ user?: IUserInfo; errorCode?: number }> {
  try {
    const response = await fetch("https://api.github.com/gists?access_token=" + token, {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (!response.ok) return { errorCode: response.status };
    const responseJSON = await response.json();
    return {
      user: {
        token: token,
        username: responseJSON.owner.login,
        gistID: responseJSON.id
      }
    };
  } catch (error) {
    console.error(error);
    return { errorCode: 500 };
  }
}

async function loadFromGist(user: IUserInfo): Promise<{ gist?: IGist; errorCode?: number }> {
  try {
    const response = await fetch(
      "https://api.github.com/gists/" + user.gistID + "?access_token=" + user.token
    );
    if (!response.ok) return { errorCode: response.status };
    const responseJSON = await response.json();
    return { gist: responseJSON };
  } catch (error) {
    console.error(error);
    return { errorCode: 500 };
  }
}

export async function getQueryMapObj(
  user: IUserInfo
): Promise<{ queryMap?: { [key: string]: IQuery }; errorCode?: number }> {
  const responseJSON = await loadFromGist(user);
  if (!responseJSON.gist) return { errorCode: responseJSON.errorCode }; // if gist doesn't exist
  const helperFile = responseJSON.gist.files["aquerium_helper.json"];
  if (!helperFile) return { errorCode: 500 }; // if file doesn't exist // should I do 404 right here?
  return { queryMap: JSON.parse(helperFile.content) };
}

async function updateGist(user: IUserInfo, data: any): Promise<{ errorCode?: number }> {
  try {
    const response = await fetch(
      "https://api.github.com/gists/" + user.gistID + "?access_token=" + user.token,
      {
        method: "PATCH",
        body: JSON.stringify(data)
      }
    );
    if (!response.ok) return { errorCode: response.status };
    return {};
  } catch (error) {
    console.error(error);
    return { errorCode: 500 };
  }
}

async function updateGistFileContent(
  user: IUserInfo,
  queryMap: { [key: string]: IQuery }
): Promise<{ errorCode?: number }> {
  const dataUpdated: IGist = {
    description: "helper gist for Aquerium",
    public: false,
    files: {
      "aquerium_helper.json": {
        content: JSON.stringify(queryMap)
      }
    }
  };
  return await updateGist(user, dataUpdated);
}

export async function addQuery(
  user: IUserInfo,
  queryMap: { [key: string]: IQuery },
  newQuery: IQuery
): Promise<{ errorCode?: number }> {
  let queryMapCopy = queryMap;
  const key = generateKey();
  queryMapCopy[key] = newQuery;
  return await updateGistFileContent(user, queryMapCopy);
}

function generateKey(): string {
  return Math.random()
    .toString(36)
    .substr(2, 16);
}

export async function deleteQuery(
  user: IUserInfo,
  queryMap: { [key: string]: IQuery },
  queryToDeleteKey: string
): Promise<{ errorCode?: number }> {
  let queryMapCopy = queryMap;
  delete queryMap[queryToDeleteKey];
  return await updateGistFileContent(user, queryMapCopy);
}

export async function editQuery(
  user: IUserInfo,
  queryMap: { [key: string]: IQuery },
  oldQueryKey: string,
  editedQuery: IQuery
): Promise<{ errorCode?: number }> {
  let queryMapCopy = queryMap;
  queryMapCopy[oldQueryKey] = editedQuery;
  return await updateGistFileContent(user, queryMapCopy);
}

export async function updateQueryTasks(
  user: IUserInfo,
  queryMap: { [key: string]: IQuery },
  queryKey: string
): Promise<{ errorCode?: number }> {
  let query = queryMap[queryKey];
  const url = getQueryResult(user, query);
  const items = await getQueryTasks(url);
  if (!items.items) return { errorCode: items.errorCode };
  query.tasks = items.items;
  return await editQuery(user, queryMap, queryKey, query);
}
