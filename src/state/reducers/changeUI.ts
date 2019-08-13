import update from "immutability-helper";
import { changeUILoginAction, changeUILogoutAction } from "../actions/changeUI";

const DEFAULT_STATE: { currUI: "Home" | "Login" | "EditQuery" | "QueryList" } = { currUI: "Login" };

/**
 * This reducer deals with changing the UI. When receiving an action, currUI is updated to reflect the UI that
 * should be shown.
 */
export const changeUI = (
  state: { currUI: "Home" | "Login" | "EditQuery" | "QueryList" } = DEFAULT_STATE,
  action: changeUILoginAction | changeUILogoutAction
) => {
  switch (action.type) {
    case "LOGIN": {
      return update(state, {
        $set: {
          ...state,
          currUI: "Home"
        }
      });
    }
    case "LOGOUT": {
      return update(state, {
        $set: {
          ...state,
          currUI: "Login"
        }
      });
    }
    default:
      return state;
  }
};
