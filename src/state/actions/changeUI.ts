/* global chrome */
import { IUserInfo, IQuery, queryListType } from "../state.types";
import { getQueryMapObj, createGist, checkForGist } from "../../util";
import { Dispatch } from "redux";
import { setIsInvalidPAT, storeUserInfo } from "../actions";
import { updateMap } from "./queryList";

/**
 * The action type for changing UI.
 */
export type changeUIAction = { type: string };

/**
 * The action type for a login action.
 */
export type changeUILoginAction = { type: string; user: IUserInfo };

/**
 * The action type for changing to the error UI.
 */
export type changeUIErrorAction = { type: string; errorCode?: number, query?: IQuery };

/**
 * The action type for changing to the QueryTaskList UI.
 */
export type changeUIQueryTaskListAction = { type: string; query: IQuery };

/**
 * The action type for changing to the EditQuery UI.
 */
export type changeUIEditQueryAction = { type: string; query?: IQuery };


/**
 * Action creator to send the user from login UI to Home UI.
 * This action creator takes in a string that determines whether a user is attempting a login from opening the extension or signing in on the login page.
 * If they are signing in on opening, the currPAT field will be blank, and this action will check to see if the user has valid credentials in local storage.
 * If they are logging in on the login screen, the action creator will check to see that their PAT is valid, as well as if they're a new or returning user.
 * @param currPAT the token entered by the user when they log in. If login is called from componentDidMount, this field will be empty.
 */
export const login = (currPAT?: string) => {
  return async function (dispatch: Dispatch) {
    if (currPAT) {
      // Called when the user is logging in from LoginUI with a PAT.
      loginViaPAT(dispatch, currPAT);
    } else {
      // Called when the user opens the application.
      loginOnApplicationMount(dispatch);
    };
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
        // We check to see if the user had any cached data in local storage.
        chrome.storage.sync.get(["currUI", "query"], resultQuery => {
          if (resultQuery.query && resultQuery.currUI) {
            if (resultQuery.currUI === "QueryList") {
              toQueryList(resultQuery.query)(dispatch);
            } else if (resultQuery.currUI === "EditQuery") {
              toEditQuery(resultQuery.query)(dispatch);
            } else {
              toHome()(dispatch);
            };
          } else {
            toHome()(dispatch);
          }
        });
      } else {
        toError(response.errorCode)(dispatch);
      };
    };
  });
};

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
        if (responseGist.user) {
          loginQueryMapExists(responseGist.user, dispatch, {});
        } else {
          dispatch(setIsInvalidPAT(true));
        };
      };
    };
  });
};

// Helper function that creates an IUserInfo.
function createIUserInfo(newPAT: string, newUsername: string, newGistID: string): IUserInfo {
  return {
    token: newPAT,
    username: newUsername,
    gistID: newGistID,
    invalidPAT: false
  };
};

// Helper function that logs in an existing user.
async function loginExistingUser(dispatch: Dispatch, user: IUserInfo): Promise<void> {
  const responseMap = await getQueryMapObj(user);
  if (responseMap.queryMap) {
    loginQueryMapExists(user, dispatch, responseMap.queryMap);
  } else {
    dispatch(setIsInvalidPAT(true));
  };
};

// Helper function that stores a user's information and goes to the HomeUI.
function loginQueryMapExists(user: IUserInfo, dispatch: Dispatch, map: queryListType) {
  chrome.storage.sync.set(user);
  dispatch(storeUserInfo(user));
  dispatch(updateMap(map));
  toHome()(dispatch);
};

/**
 * Action creator to clear a user's stored token and then logout.
 */
export const clearTokenLogout = () => {
  return function (dispatch: Dispatch) {
    chrome.storage.sync.set({ token: "", currUI: "Login" });
    dispatch(goToLogout());
  };
};

/**
 * Sets local storage to reflect the updated UI and then calls the goToLogout action.
 */
export const logout = () => {
  return function (dispatch: Dispatch) {
    chrome.storage.sync.set({ currUI: "Login" });
    dispatch(goToLogout());
  };
};

/**
 * Sets local storage to reflect the updated UI and then calls the goToEditQuery action.
 */
export const toEditQuery = (query?: IQuery) => {
  return function (dispatch: Dispatch) {
    chrome.storage.sync.set({ currUI: "EditQuery" });
    dispatch(goToEditQuery(query));
  };
};

/**
 * Sets local storage to reflect the updated UI and then calls the goToQueryList action.
 */
export const toQueryList = (query: IQuery) => {
  return function (dispatch: Dispatch) {
    chrome.storage.sync.set({ currUI: "QueryList", query: query });
    dispatch(goToQueryList(query));
  };
};

/**
 * Sets local storage to reflect the updated UI and then calls the goToHome action.
 */
export const toHome = () => {
  return function (dispatch: Dispatch) {
    chrome.storage.sync.set({ currUI: "Home" });
    dispatch(goToHome());
  };
};

/**
 * Sets local storage to reflect the updated UI and then calls the goToError action.
 */
export const toError = (errorCode?: number, query?: IQuery) => {
  return function (dispatch: Dispatch) {
    chrome.storage.sync.set({ currUI: "ErrorPage" });
    dispatch(goToError(errorCode, query));
  };
};

/**
 * Action creator to send the user from home UI to Login UI.
 */
const goToLogout = () => ({
  type: "LOGOUT"
});

/**
 * Action creator to send the user to Edit Query UI.
 */
const goToEditQuery = (query?: IQuery) => ({
  type: "EDIT",
  query
});

/**
 * Action creator to send the user to the QueryList UI.
 */
const goToQueryList = (query: IQuery) => ({
  type: "QUERY",
  query
});

/**
 * Action creator to send the user to Home UI.
 */
const goToHome = () => ({
  type: "HOME"
});

/**
 * Action creator to send the user to the Error UI.
 */
const goToError = (errorCode?: number, query?: IQuery) => ({
  type: "ERROR",
  errorCode,
  query
});
