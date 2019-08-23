import { IUserInfo } from "../state.types";
import update from "immutability-helper";
import { changeUILoginAction, changeUIAction, setValidPATAction } from "../actions";

const DEFAULT_STATE: IUserInfo = { token: "", username: "", gistID: "", invalidPAT: false };

/**
 * This reducer deals with receiving the actions that modify the user property of the state
 */
export const user = (
  state: IUserInfo = DEFAULT_STATE,
  action: changeUILoginAction | changeUIAction
) => {
  switch (action.type) {
    case "USER": {
      const { user } = action as changeUILoginAction;
      return update(state, { $set: user });
    }
    case "LOGOUT": {
      return update(state, { $set: { token: "", username: "", gistID: "", invalidPAT: false } });
    }
    case "SET_INVALID_PAT": {
      const invalidity: boolean = (action as setValidPATAction).isInvalid;
      return update(state, { invalidPAT: { $set: invalidity } });
    }
    default:
      return state;
  }
};
