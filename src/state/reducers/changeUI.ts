import update from "immutability-helper";
import {
  changeUIAction,
  changeUIQueryTaskListAction,
  changeUIErrorAction
} from "../actions/changeUI";
import { IState } from "../state.types";

const DEFAULT_STATE: IState["changeUI"] = { currUI: "Login" };

/**
 * This reducer deals with changing the UI. When receiving an action, currUI is updated to reflect the UI that
 * should be shown.
 */
export const changeUI = (
  state: IState["changeUI"] = DEFAULT_STATE,
  action: changeUIAction | changeUIQueryTaskListAction | changeUIErrorAction
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
    case "HOME": {
      return update(state, { currUI: { $set: "Home" } });
    }
    case "ERROR": {
      return update(state, {
        currUI: { $set: "ErrorPage" },
        errorMessage: { $set: (action as changeUIErrorAction).message }
      });
    }
    default:
      return state;
  }
};
