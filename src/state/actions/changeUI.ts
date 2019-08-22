/* global chrome */
import { IUserInfo, IState, IQuery } from "../state.types";
import { getQueryMapObj, createGist } from "../../util/api";
import { Dispatch } from "redux";
import { setIsInvalidPAT, updateMap } from "../actions";

/**
 * The action type for generically changing UI.
 */
export type changeUIAction = { type: string };

/**
 * The action type for a login action.
 */
export type changeUILoginAction = { type: string; user: IUserInfo };

/**
 * The action type for a login action.
 */
export type changeUIQueryTaskListAction = { type: string; query: IQuery };

/**
 * Action creator to send the user from login UI to Home UI.
 * This action creator takes in a string that determines whether a user is attempting a login from opening the extension or signing in on the login page.
 * If they are signing in on opening, the currPAT field will be blank, and this action will check to see if the user has valid credentials in local storage.
 * If they are logging in on the login screen, the action creator will check to see that their PAT is valid, as well as if they're a new or returning user.
 */

export const login = (currPAT: string) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    if (currPAT !== "") {
      dispatch(setIsInvalidPAT(false));
      dispatch(isLoginLoadingTrue());
      console.log("login with gist");
      chrome.storage.sync.get(["username", "gistID"], async result => {
        if (result.username && result.gistID) {
          const user: IUserInfo = {
            token: currPAT,
            username: result.username,
            gistID: result.gistID,
            invalidPAT: false
          };
          //some indicator
          const responseMap = await getQueryMapObj(user);
          if (responseMap.queryMap === undefined) {
            //If queryMap is undefined, this this user has invalid credentials
            dispatch(isLoginLoadingFalse());
            dispatch(setIsInvalidPAT(true));
          } else {
            //else, the user's querymap already exists
            dispatch(setIsInvalidPAT(false));
            chrome.storage.sync.set({
              token: currPAT,
              username: user.username,
              gistID: user.gistID,
              invalidPAT: false
            });
            dispatch(updateMap(responseMap.queryMap));
            dispatch(storeUserInfo(user));
            dispatch(isLoginLoadingFalse());
            dispatch(toHome());
          }
        } else {
          //if username and gistID aren't in storage, then this is a new user! We need to see if their PAT is valid
          const responseGist = await createGist(currPAT);
          if (responseGist.user === undefined) {
            //if the pat is invalid
            dispatch(isLoginLoadingFalse());
            dispatch(setIsInvalidPAT(true));
          } else {
            //if the pat is valid, make a new user and save their userInfo to the gist
            dispatch(setIsInvalidPAT(false));
            chrome.storage.sync.set({
              token: currPAT,
              username: responseGist.user.username,
              gistID: responseGist.user.gistID,
              invalidPAT: false
            });
            dispatch(storeUserInfo(responseGist.user));
            dispatch(isLoginLoadingFalse());
            dispatch(toHome());
          }
        }
      });
    } else {
      console.log("Logging in (if no pat is entered, called from did mount)");
      chrome.storage.sync.get(["token", "username", "gistID"], async result => {
        console.log("in storage sync");
        if (result.token && result.username && result.gistID) {
          const user: IUserInfo = {
            token: result.token,
            username: result.username,
            gistID: result.gistID,
            invalidPAT: false
          };
          const response = await getQueryMapObj(user);
          if (response.queryMap) {
            dispatch(storeUserInfo(user));
            console.log("querymap is is valid! Loading data...");
            console.log(response.queryMap);
            dispatch(updateMap(response.queryMap));
            dispatch(isLoginLoadingFalse());
            dispatch(toHome());
          } else {
          }
        } else {
        }
      });
      console.log("out of storage sync. did you see an In?");
    }
  };
};

/**
 * Action creator to clear a user's stored token and then logout
 */
export const clearTokenLogout = () => {
  return async function(dispatch: Dispatch, getState: () => IState) {
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
export const toQueryList = (query: IQuery) => ({
  type: "QUERY",
  query
});

/**
 * Action creator to send the user to Home UI
 */
export const toHome = () => ({
  type: "HOME"
});

/**
 * Action creator to store UserInfo in state
 */
export const storeUserInfo = (user: IUserInfo) => ({
  type: "USER",
  user
});

export const isHomeLoadingTrue = () => ({
  type: "HOME_LOADING_TRUE"
});

export const isHomeLoadingFalse = () => ({
  type: "HOME_LOADING_FALSE"
});

export const isLoginLoadingTrue = () => ({
  type: "LOGIN_LOADING_TRUE"
});

export const isLoginLoadingFalse = () => ({
  type: "LOGIN_LOADING_FALSE"
});
