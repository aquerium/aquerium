/* global chrome */
import { IUserInfo, IState } from "../state.types";
import { getQueryMapObj, createGist } from "../../api";
import { Dispatch } from "redux";
import { setValidPAT } from "../actions";

/**
 * The action type for changing UI.
 */
export type changeUIAction = { type: string };

/**
 * The action type for a login action.
 */
export type changeUILoginAction = { type: string; user: IUserInfo };

/**
 * Action creator to send the user from login UI to Home UI. This action creator
 */

export const login = (currPAT: string) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    if (currPAT !== "") {
      chrome.storage.sync.get(["username", "gistID"], async result => {
        if (result.username && result.gistID) {
          const user: IUserInfo = {
            token: currPAT,
            username: result.username,
            gistID: result.gistID
          };
          const responseMap = await getQueryMapObj(user); // This gets called twice if a user's pat is invalid and they try it again
          if (responseMap.queryMap === undefined) {
            //If queryMap is undefined, this this user has invalid credentials
            dispatch(setValidPAT(false));
          } else {
            //else, the user's querymap already exists
            dispatch(setValidPAT(true));
            chrome.storage.sync.set({
              token: currPAT,
              username: user.username,
              gistID: user.gistID
            });
            dispatch(storeUserInfo(user));
            dispatch(toHome());
          }
        } else {
          //if username and gistID aren't in storage, then this is a new user!
          const responseGist = await createGist(currPAT);
          if (responseGist.user === undefined) {
            //if the pat is invalid yet again
            dispatch(setValidPAT(false));
          } else {
            //if the pat is valid, make a new user and save the creds
            dispatch(setValidPAT(true));
            chrome.storage.sync.set({
              token: currPAT,
              username: responseGist.user.username,
              gistID: responseGist.user.gistID
            });
            dispatch(storeUserInfo(responseGist.user));
            dispatch(toHome());
          }
        }
      });
    } else {
      chrome.storage.sync.get(["token", "username", "gistID"], async result => {
        if (result.token && result.username && result.gistID) {
          const user: IUserInfo = {
            token: result.token,
            username: result.username,
            gistID: result.gistID
          };
          const response = await getQueryMapObj(user);
          if (response.queryMap) {
            dispatch(storeUserInfo(user));
            dispatch(toHome());
          }
        }
      });
    }
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

/**
 * Action creator to store UserInfo in state
 */
export const storeUserInfo = (user: IUserInfo) => ({
  type: "USER",
  user
});
