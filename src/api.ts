import * as fetch from "isomorphic-fetch";

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

// export interface IQuery {
//   name: string;
//   type?: "issue" | "pr";
//   repo?: string;
//   assignee?: string;
//   author?: string;
//   mentions?: string;
//   reviewStatus?:
//     | "No reviews"
//     | "Review required"
//     | "Approved review"
//     | "Changes requested"
//     | "Reviewed by you"
//     | "Awaiting review from you";
//   labels?: string[];
//   stalenessIssue: number;
//   stalenessPull: number;
//   tasks: ITask[];
// }

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

export async function loadFromGist(user: IUserInfo): Promise<{ gist?: IGist; errorCode?: number }> {
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
