import fetch from "isomorphic-fetch";
import { IQuery, IUserInfo } from "../state";

const GIST_NAME = "aquerium_helper.json";
const GIST_DESCRIP = "helper gist for Aquerium";

/**
 * Represents the object structure for using GitHub Gists API.
 */
interface IGist {
  /** Description of the gist. */
  description: string;
  /** Whether the gist is public or private. */
  public: boolean;
  /** Files contained in the gist. */
  files: {
    /** Name of the file. */
    [key: string]: {
      /** File contents. */
      content: string;
    };
  };
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
 * Reads from the user's gist and returns the gist contents in IGist format.
 * @param user Contains the user's relevant information.
 */
async function loadFromGist(user: IUserInfo): Promise<{ gist?: IGist; errorCode?: number }> {
  try {
    const response = await fetch(
      "https://api.github.com/gists/" + user.gistID + "?access_token=" + user.token,
      {
        headers: new Headers({
          "If-None-Match": ""
        })
      }
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
