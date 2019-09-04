/*global chrome*/
import update from "immutability-helper";
import { changeUIAction, changeUIErrorAction, changeUIQueryTaskListAction, changeUIEditQueryAction } from "../actions/changeUI";
import { IState } from "../state.types";

const DEFAULT_STATE: IState["changeUI"] = { currUI: "Login" };

/**
 * This reducer deals with changing the UI. When receiving an action, currUI is updated to reflect the UI that
 * should be shown.
 */
export const changeUI = (
  state: IState["changeUI"] = DEFAULT_STATE,
  action: changeUIAction | changeUIQueryTaskListAction | changeUIEditQueryAction
) => {
  switch (action.type) {
    case "LOGIN": {
      return update(state, { currUI: { $set: "Home" } });
    }
    case "LOGOUT": {
      return update(state, { currUI: { $set: "Login" } });
    }
    case "EDIT": {
      const { query } = action as changeUIEditQueryAction;
      return update(state, { currUI: { $set: "EditQuery" }, currQuery: { $set: query } });
    }
    case "QUERY": {
      const { query } = action as changeUIQueryTaskListAction;
      return update(state, { currUI: { $set: "QueryList" }, currQuery: { $set: query } });
    }
    case "HOME": {
      return update(state, { currUI: { $set: "Home" }, currQuery: { $set: undefined } });
    }
    case "ERROR": {
      const { errorCode, query } = action as changeUIErrorAction;
      return update(state, {
        currUI: { $set: "ErrorPage" },
        errorCode: { $set: errorCode },
        currQuery: { $set: query }
      });
    }
    default:
      return state;
  }
};
