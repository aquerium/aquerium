import update from "immutability-helper";
import { changeUIAction, changeUIQueryTaskListAction } from "../actions/changeUI";
import { IState } from "../state.types";

const DEFAULT_STATE: IState["changeUI"] = {
  currUI: "Login",
  currQuery: undefined,
  isHomeLoading: false
};

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
      return update(state, { currUI: { $set: "Home" } });
    }
    case "LOGOUT": {
      return update(state, { currUI: { $set: "Login" } });
    }
    case "EDIT": {
      return update(state, { currUI: { $set: "EditQuery" } });
    }
    case "QUERY": {
      const { query } = action as changeUIQueryTaskListAction;
      return update(state, {
        $set: { currUI: "QueryList", currQuery: query, isHomeLoading: false }
      });
    }
    case "HOME": {
      return update(state, { currUI: { $set: "Home" }, currQuery: { $set: undefined } });
    }
    case "HOME_LOADING_TRUE": {
      return update(state, { isHomeLoading: { $set: true } });
    }
    case "HOME_LOADING_FALSE": {
      return update(state, { isHomeLoading: { $set: false } });
    }
    default:
      return state;
  }
};
