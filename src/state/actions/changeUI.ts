/* global chrome */
import { IUserInfo, IState, queryListType } from "../state.types";
import { getQueryMapObj, createGist, checkForGist } from "../../util";
import { Dispatch } from "redux";
import { setIsInvalidPAT, storeUserInfo, updateMap } from "../actions";

/**
 * The action type for changing UI.
 */
export type changeUIAction = { type: string };

/**
 * The action type for a login action.
 */
export type changeUILoginAction = { type: string; user: IUserInfo };

/**
 * Action creator to send the user from login UI to Home UI.
 * This action creator takes in a string that determines whether a user is attempting a login from opening the extension or signing in on the login page.
 * If they are signing in on opening, the currPAT field will be blank, and this action will check to see if the user has valid credentials in local storage.
 * If they are logging in on the login screen, the action creator will check to see that their PAT is valid, as well as if they're a new or returning user.
 * @param currPAT the token entered by the user when they log in. If login is called from componentDidMount, this field will be empty
 */
export const login = (currPAT?: string) => {
  return async function(dispatch: Dispatch) {
    if (currPAT) {
      // Called when the user is logging in from LoginUI with a PAT.
      loginViaPAT(dispatch, currPAT);
    } else {
      // Called when the user opens the application.
      loginOnApplicationMount(dispatch);
    }
  };
};

// Helper function to attempt to log a user in when the extension is first opened.
// Checks for valid credentials and loads the appropriate map if they are approved.
function loginOnApplicationMount(dispatch: Dispatch) {
  chrome.storage.sync.get(["token", "username", "gistID"], async result => {
    if (result.token && result.username && result.gistID) {
      const user = createIUserInfo(result.token, result.username, result.gistID);
      const response = await getQueryMapObj(user);
      if (response.queryMap) {
        dispatch(storeUserInfo(user));
        dispatch(updateMap(response.queryMap));
        dispatch(toHome());
      }
    }
  });
}

// Helper function to attempt to log a user in via their PAT.
function loginViaPAT(dispatch: Dispatch, PAT: string) {
  chrome.storage.sync.get(["username", "gistID"], async result => {
    if (result.username && result.gistID) {
      const user = createIUserInfo(PAT, result.username, result.gistID);
      await loginExistingUser(dispatch, user);
    } else {
      const response = await checkForGist(PAT);
      // If there already is a gist for this account, then update local storage.
      if (response.gist && response.gist.owner && response.gist.id) {
        const user = createIUserInfo(PAT, response.gist.owner.login, response.gist.id);
        await loginExistingUser(dispatch, user);
      } else {
        // Then this is a new user! We need to see if their PAT is valid.
        const responseGist = await createGist(PAT);
        if (responseGist.user === undefined) {
          // If the response from createGIST is invalid.
          dispatch(setIsInvalidPAT(true));
        } else {
          // Store this user's info in local storage and in redux.
          loginQueryMapExists(responseGist.user, dispatch, {});
        }
      }
    }
  });
}

// Helper function that creates an IUserInfo.
function createIUserInfo(newPAT: string, newUsername: string, newGistID: string): IUserInfo {
  return {
    token: newPAT,
    username: newUsername,
    gistID: newGistID,
    invalidPAT: false
  };
}

// Helper function that logs in an existing user.
async function loginExistingUser(dispatch: Dispatch, user: IUserInfo): Promise<void> {
  const responseMap = await getQueryMapObj(user);
  if (responseMap.queryMap === undefined) {
    // If queryMap is undefined, this user has invalid credentials.
    dispatch(setIsInvalidPAT(true));
  } else {
    // Else, the user's querymap already exists.
    loginQueryMapExists(user, dispatch, responseMap.queryMap);
  }
}

// Helper function that stores a user's information and goes to the HomeUI.
function loginQueryMapExists(user: IUserInfo, dispatch: Dispatch, map: queryListType) {
  chrome.storage.sync.set(user);
  dispatch(storeUserInfo(user));
  dispatch(updateMap(map));
  dispatch(toHome());
}

/**
 * Action creator to clear a user's stored token and then logout.
 */
export const clearTokenLogout = () => {
  return function(dispatch: Dispatch) {
    chrome.storage.sync.set({ token: "" });
    dispatch(logout());
  };
};

/**
 * Action creator to send the user from home UI to Login UI.
 */
export const logout = () => ({
  type: "LOGOUT"
});

/**
 * Action creator to send the user to Edit Query UI.
 */
export const toEditQuery = () => ({
  type: "EDIT"
});

/**
 * Action creator to send the user to QueryList UI.
 */
export const toQueryList = () => ({
  type: "QUERY"
});

/**
 * Action creator to send the user to Home UI
 */
export const toHome = () => ({
  type: "HOME"
});
