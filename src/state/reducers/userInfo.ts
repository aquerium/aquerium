import { IUserInfo } from "../state.types";
import update from "immutability-helper";
import { changeUILoginAction, changeUIAction } from "../actions/changeUI";

const DEFAULT_STATE: IUserInfo = { token: "", username: "", gistID: "" };

/**
 * This reducer deals with receiving the actions that modify the user property of the state
 */
export const userInfo = (
  state: IUserInfo = DEFAULT_STATE,
  action: changeUILoginAction | changeUIAction
) => {
  switch (action.type) {
    case "USER": {
      const { user } = action as changeUILoginAction;
      return update(state, { $set: user });
    }
    case "LOGOUT": {
      return update(state, { $set: { token: "", username: "", gistID: "" } });
    }
    default:
      return state;
  }
};
