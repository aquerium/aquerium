import update from "immutability-helper";
import { changeUILogAction } from "../actions/changeUI";
import { IState } from "../state.types";

const DEFAULT_STATE: IState["changeUI"] = { currUI: "Login" };

/**
 * This reducer deals with changing the UI. When receiving an action, currUI is updated to reflect the UI that
 * should be shown.
 */
export const changeUI = (state: IState["changeUI"] = DEFAULT_STATE, action: changeUILogAction) => {
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
      return update(state, { currUI: { $set: "QueryList" } });
    }
    case "HOME": {
      return update(state, { currUI: { $set: "Home" } });
    }
    default:
      return state;
  }
};
