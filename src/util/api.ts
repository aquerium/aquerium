import { IQuery, IUserInfo, ILabel } from "../state";
import { IGist } from "./github";
import { Octokit } from "@octokit/rest";
import { GIST_NAME, GIST_DESCRIP, STATUS_CREATED, STATUS_OK } from "./constants";
import fetch from "isomorphic-fetch";

let octokitObj: { octokit: Octokit; token: string };

/**
 * Returns an Octokit instance (or if it doesn't exist, creates one).
 * @param token User's GitHub personal access token.
 */
export function getOctokit(token: string): Octokit {
  if (!octokitObj || octokitObj.token !== token) {
    octokitObj = {
      octokit: new Octokit({
        auth: token
      }),
      token: token
    };
  }
  return octokitObj.octokit;
}

/**
 * Creates a GitHub gist upon initial submission of the user's personal access token and returns the user's relevant information.
 * @param token User's GitHub personal access token.
 */
export async function createGist(token: string): Promise<{ user?: IUserInfo; errorCode?: number }> {
  try {
    const dataGist: IGist = {
      description: GIST_DESCRIP,
      public: false,
      files: {
        [GIST_NAME]: {
          content: "{}"
        }
      }
    };
    const octokit = getOctokit(token);
    const response = await octokit.gists.create(dataGist);
    if (response.status !== STATUS_CREATED) {
      return { errorCode: response.status };
    }
    return {
      user: {
        token: token,
        username: response.data.owner.login,
        gistID: response.data.id,
        invalidPAT: false
      }
    };
  } catch (error) {
    return { errorCode: 500 };
  }
}

/**
 * Returns the queryMap object in the user's gist file.
 * @param user Contains the user's relevant information.
 */
export async function getQueryMapObj(
  user: IUserInfo
): Promise<{ queryMap?: { [key: string]: IQuery }; errorCode?: number }> {
  const responseJSON = await loadFromGist(user);
  if (!responseJSON.gist) {
    return { errorCode: responseJSON.errorCode };
  }
  const helperFile = responseJSON.gist.files[GIST_NAME];
  if (!helperFile) {
    return { errorCode: 500 };
  }
  return { queryMap: JSON.parse(helperFile.content) };
}

/**
 * Updates the user's gist contents with an updated queryMap object.
 * @param user Contains the user's relevant information.
 * @param queryMap Contains the user's queries in a dictionary.
 */
export async function updateGist(
  user: IUserInfo,
  queryMap: { [key: string]: IQuery }
): Promise<{ errorCode?: number }> {
  try {
    const octokit = getOctokit(user.token);
    const response = await octokit.gists.update({
      gist_id: user.gistID,
      files: {
        [GIST_NAME]: {
          filename: GIST_NAME,
          content: JSON.stringify(queryMap)
        }
      }
    } as any); // The 'as any' is used here because Octokit does not support editing 'filename' and 'content' by key.
    if (response.status !== STATUS_OK) {
      return { errorCode: response.status };
    }
    return {};
  } catch (error) {
    return { errorCode: 500 };
  }
}

/**
 * Checks whether a helper gist has already been created for a given token.
 * @param token User's GitHub personal access token.
 */
export async function checkForGist(token: string): Promise<{ gistInfo?: any; errorCode?: number }> {
  try {
    const octokit = getOctokit(token);
    const response = await octokit.gists.list();
    if (response.status !== STATUS_OK) {
      return { errorCode: response.status };
    }
    const responseJSON = response.data;
    for (const gist of responseJSON) {
      if (gist.files.hasOwnProperty(GIST_NAME)) {
        const gistInfo = {
          id: gist.id,
          owner: gist.owner
        };
        return { gistInfo: gistInfo };
      }
    }
    return {};
  } catch (error) {
    return { errorCode: 500 };
  }
}

/**
 * This function interacts with the GitHub API in order to
 * fetch valid labels from a valid repo.
 * @param repo The repo to attempt to fetch labels from.
 */
export async function getRepoLabels(
  repo: string
): Promise<{ labels?: ILabel[]; errorCode?: number }> {
  try {
    let labels: ILabel[] = [];
    // Fetch initial set of labels.
    const labelsURL = "https://api.github.com/repos/" + repo + "/labels";
    const response = await fetch(labelsURL, {
      headers: { Accept: "application/vnd.github.symmetra-preview+json" }
    });
    if (!response.ok) {
      return { errorCode: response.status };
    }
    // Save the initial set of labels.
    const data = await response.json();
    labels = labels.concat(
      data.map((label: { name: string; color: string }) => ({
        name: label.name,
        color: label.color
      }))
    );

    // Check if the response header indicates more than 1 page of labels.
    const headerLinks = response.headers.get("Link");
    if (headerLinks) {
      //Filter the Link header and extract the second url, which has the amount of pages.
      const lastLink = headerLinks.split(/<(.*?)>/g).filter(link => link.includes("https://"))[1];
      let numPages = parseInt(lastLink.substring(lastLink.lastIndexOf("=") + 1));

      // Fetch all pages of labels.
      for (let i = 2; i <= numPages; i++) {
        const response = await fetch(labelsURL + "?page=" + i, {
          headers: { Accept: "application/vnd.github.symmetra-preview+json" }
        });
        if (!response.ok) {
          return { errorCode: response.status };
        }
        const data = await response.json();
        labels = labels.concat(
          data.map((label: { name: string; color: string }) => ({
            name: label.name,
            color: label.color
          }))
        );
      }
    }
    return { labels: labels };
  } catch (error) {
    return { errorCode: 500 };
  }
}

// Reads from the user's gist and returns the gist contents.
async function loadFromGist(user: IUserInfo): Promise<{ gist?: IGist; errorCode?: number }> {
  try {
    const octokit = getOctokit(user.token);
    // The 'octokit.request' is used here in order to declare the 'If-None-Match' header.
    const response = await octokit.request("GET /gists/:gist_id", {
      gist_id: user.gistID,
      headers: {
        "If-None-Match": ""
      }
    });
    if (response.status !== STATUS_OK) {
      return { errorCode: response.status };
    }
    return { gist: response.data };
  } catch (error) {
    return { errorCode: 500 };
  }
}
