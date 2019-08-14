import { IUserInfo } from "../state.types";
import update from "immutability-helper";
import { changeUILogAction } from "../actions/changeUI";

const DEFAULT_STATE: IUserInfo = { token: "", username: "", gistID: "" };

/**
 * This reducer deals with receiving the login action. Once received, the user info is stored in the state
 */
export const userInfo = (state: IUserInfo = DEFAULT_STATE, action: changeUILogAction) => {
  switch (action.type) {
    case "LOGIN": {
      const { user } = action as changeUILogAction;
      return update(state, {
        token: { $set: user.token },
        username: { $set: user.username },
        gistID: { $set: user.gistID }
      });
    }
    case "LOGOUT": {
      return update(state, {
        token: { $set: "" },
        username: { $set: "" },
        gistID: { $set: "" }
      });
    }
    default:
      return state;
  }
};
