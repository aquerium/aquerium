import { updateQueryListAction, editQueryAction } from "../actions/queryList";
import { queryListType } from "../state.types";
import update from "immutability-helper";

const DEFAULT_STATE: queryListType = {};

/**
 * Our reducer responds to the various actions regarding queryList
 * @param state the portion of the total state we are replacing
 * @param action the object of type addQueryAction or removeQueryAction
 */
export const queryList = (
  state: queryListType = DEFAULT_STATE,
  action: updateQueryListAction | editQueryAction
) => {
  switch (action.type) {
    case "UPDATE_LIST": {
      const newList = (action as updateQueryListAction).updatedList;
      return update(state, { $set: newList });
    }
    case "EDIT_QUERY": {
      const q = (action as editQueryAction).query;
      return update(state, { [q.id]: { $set: q } });
    }
    default:
      return state;
  }
};
