import update from "immutability-helper";
import { changeUILoginAction, changeUILogoutAction } from "../actions/changeUI";

const DEFAULT_STATE: { currUI: string } = { currUI: "Login" };

/**
 * This reducer deals with changing the UI
 * @param currUI the current UI being shown. This needs to be updated to change the UI
 */
export const changeUI = (
  state: { currUI: string } = DEFAULT_STATE,
  action: changeUILoginAction | changeUILogoutAction
) => {
  switch (action.type) {
    case "LOGIN": {
      const nextUI: string = (action as changeUILoginAction).change;
      return update(state, {
        $set: {
          ...state,
          currUI: nextUI
        }
      });
    }
    case "LOGOUT": {
      const nextUI: string = (action as changeUILogoutAction).change;
      return update(state, {
        $set: {
          ...state,
          currUI: nextUI
        }
      });
    }
    default:
      return state;
  }
};
//only need 1 reducer for update, that's a set
