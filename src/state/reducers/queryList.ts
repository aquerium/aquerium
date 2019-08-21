import { updateQueryListAction } from "../actions";
import { queryListType } from "../state.types";
import update from "immutability-helper";

const DEFAULT_STATE: queryListType = {};

/**
 * Our reducer responds to the actions regarding updating the queryList
 */
export const queryList = (state: queryListType = DEFAULT_STATE, action: updateQueryListAction) => {
  switch (action.type) {
    case "UPDATE_LIST": {
      const newList = (action as updateQueryListAction).updatedList;
      return update(state, { $set: newList });
    }
    default:
      return state;
  }
};
