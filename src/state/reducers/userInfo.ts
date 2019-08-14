import { IUserInfo } from "../state.types";
import update from "immutability-helper";
import { changeUILoginAction } from "../actions/changeUI";

const DEFAULT_STATE: IUserInfo = { token: "", username: "", gistID: "" };

/**
 * This reducer deals with receiving the login action. Once received, the user info is stored in the state
 */
export const userInfo = (state: IUserInfo = DEFAULT_STATE, action: changeUILoginAction) => {
  switch (action.type) {
    case "LOGIN": {
      const { userInformation } = action as changeUILoginAction;
      return update(state, {
        token: { $set: userInformation.token },
        username: { $set: userInformation.username },
        gistID: { $set: userInformation.gistID }
      });
    }
    default:
      return state;
  }
};
