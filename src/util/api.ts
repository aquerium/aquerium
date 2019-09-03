import fetch from "isomorphic-fetch";
import { IQuery, IUserInfo } from "../state";
import { IGist } from "./github";
import { emoji } from "../util";
import Octokit from "@octokit/rest";

const GIST_NAME = "aquerium_helper.json";
const GIST_DESCRIP = "helper gist for Aquerium";

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
    const response = await fetch("https://api.github.com/gists?access_token=" + token, {
      method: "POST",
      body: JSON.stringify(dataGist)
    });
    if (!response.ok) {
      return { errorCode: response.status };
    }
    const responseJSON = await response.json();
    return {
      user: {
        token: token,
        username: responseJSON.owner.login,
        gistID: responseJSON.id,
        invalidPAT: false
      }
    };
  } catch (error) {
    console.error(error);
    return { errorCode: 500 };
  }
}

/**
 * Returns the queryMap object in the user's gist file.
 * @param user IUserInfo object with the user's relevant information.
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
 * @param user IUserInfo object with the user's relevant information.
 * @param queryMap Contains the user's queries in a dictionary.
 */
export async function updateGist(
  user: IUserInfo,
  queryMap: { [key: string]: IQuery }
): Promise<{ errorCode?: number }> {
  try {
    const dataGist: IGist = {
      description: GIST_DESCRIP,
      public: false,
      files: {
        [GIST_NAME]: {
          content: JSON.stringify(queryMap)
        }
      }
    };
    const response = await fetch(
      "https://api.github.com/gists/" + user.gistID + "?access_token=" + user.token,
      {
        method: "PATCH",
        body: JSON.stringify(dataGist)
      }
    );
    if (!response.ok) {
      return { errorCode: response.status };
    }
    return {};
  } catch (error) {
    console.error(error);
    return { errorCode: 500 };
  }
}

/**
 * Checks whether a helper gist has already been created for a given token.
 * @param token User's GitHub personal access token.
 */
export async function checkForGist(token: string): Promise<{ gist?: IGist; errorCode?: number }> {
  try {
    const response = await fetch("https://api.github.com/gists?access_token=" + token);
    if (!response.ok) {
      return { errorCode: response.status };
    }
    const responseJSON: IGist[] = await response.json();
    for (let gist of responseJSON) {
      if (gist.files.hasOwnProperty(GIST_NAME)) {
        return { gist: gist };
      }
    }
    return {};
  } catch (error) {
    console.error(error);
    return { errorCode: 500 };
  }
}

// Reads from the user's gist and returns the gist contents.
async function loadFromGist(user: IUserInfo): Promise<{ gist?: IGist; errorCode?: number }> {
  try {
    const response = await fetch(
      "https://api.github.com/gists/" + user.gistID + "?access_token=" + user.token
    );
    if (!response.ok) {
      return { errorCode: response.status };
    }
    const responseJSON = await response.json();
    return { gist: responseJSON };
  } catch (error) {
    console.error(error);
    return { errorCode: 500 };
  }
}

export async function getRepoLabels(
  // TODO: Take in user: IUserInfo
  repo: string
): Promise<{ labels?: string[]; errorCode?: number }> {
  try {
    // const octokit = new Octokit({ auth: "" }); // TODO: Inside the quotes should be user.token
    // const options = octokit.issues.listLabelsForRepo.endpoint.merge({
    //   owner: repo.substr(0, repo.indexOf("/")),
    //   repo: repo.substr(repo.indexOf("/") + 1)
    // });
    // const labels = await octokit.paginate(options);
    // return { labels: labels.map(label => label.name) };
    let labels: string[] = [];
    //Fetch initial set of labels.
    const labelsURL = "https://api.github.com/repos/" + repo + "/labels";
    const response = await fetch(labelsURL);
    if (!response.ok) {
      return { errorCode: response.status };
    }
    //Save the initial set of labels.
    const data = await response.json();
    labels = labels.concat(data.map((label: { name: string }) => label.name));

    //Check if the response header indicates more than 1 page of labels.
    const headerLinks = response.headers.get("Link");
    if (headerLinks) {
      const lastLink = headerLinks.split(/<(.*?)>/g).filter(link => link.includes("https://"))[1];
      let numPages = parseInt(lastLink.substring(lastLink.lastIndexOf("=") + 1));
      console.log(numPages);
      //Fetch all pages of labels.
      for (let i = 2; i < numPages; i++) {
        const response = await fetch(labelsURL + "?page=" + i);
        if (!response.ok) {
          return { errorCode: response.status };
        }
        const data = await response.json();
        labels = labels.concat(data.map((label: { name: string }) => label.name));
      }
    }
    return { labels: labels };
  } catch (error) {
    return { errorCode: 500 };
  }
}
