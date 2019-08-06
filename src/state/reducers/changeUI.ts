import { IState, IQuery, ITask } from "../state.types";

/**
 * This file is responsible for the reducers that deal with the UI
 */

/**
 * We need to have a default state for when we first start the application
 * Type: IState
 */
const DEFAULT_STATE: { cur_UI: string; token: string } = { cur_UI: "Login", token: "" };

/**
 * This reducer deals with UI and storing the Token
 * @param cur_UI
 * @param token
 */
export const changeUI = (state: { cur_UI: string; token: string } = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case "SUBMIT": {
      //store token, go to login UI
      const updatedState = { ...state };
      updatedState.cur_UI = "Home";
      updatedState.token = action.token;
      return updatedState;
    }
    default:
      return state;
  }
};
