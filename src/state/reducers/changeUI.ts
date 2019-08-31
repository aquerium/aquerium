/*global chrome*/
import update from "immutability-helper";
import { changeUIAction, changeUIQueryTaskListAction } from "../actions/changeUI";
import { IState } from "../state.types";

const DEFAULT_STATE: IState["changeUI"] = { currUI: "Login" };

/**
 * This reducer deals with changing the UI. When receiving an action, currUI is updated to reflect the UI that
 * should be shown.
 */
export const changeUI = (
  state: IState["changeUI"] = DEFAULT_STATE,
  action: changeUIAction | changeUIQueryTaskListAction
) => {
  switch (action.type) {
    case "LOGIN": {
      chrome.storage.sync.set({ currUI: "Home" });
      return update(state, { currUI: { $set: "Home" } });
    }
    case "LOGOUT": {
      chrome.storage.sync.set({ currUI: "Login" });
      return update(state, { currUI: { $set: "Login" } });
    }
    case "EDIT": { //when should we update state
      chrome.storage.sync.set({ currUI: "EditQuery" });
      return update(state, { currUI: { $set: "EditQuery" } });
    }
    case "QUERY": {
      const { query } = action as changeUIQueryTaskListAction;
      chrome.storage.sync.set({ currUI: "QueryList", query: query });
      return update(state, { currUI: { $set: "QueryList" }, currQuery: { $set: query } });
    }
    case "HOME": {
      chrome.storage.sync.set({ currUI: "Home" });
      return update(state, { currUI: { $set: "Home" }, currQuery: { $set: undefined } });
    }
    default:
      return state;
  }
};
