import update from "immutability-helper";
import { setValidPATAction } from "../actions";

const DEFAULT_STATE: boolean = false;

/**
 * This reducer sets the validity of the user's entered PAT on the Login UI
 */
export const invalidPAT = (state: boolean = DEFAULT_STATE, action: setValidPATAction) => {
  switch (action.type) {
    case "SET_VALID_PAT": {
      return update(state, { $set: action.isInvalid });
    }
    default:
      return state;
  }
};
