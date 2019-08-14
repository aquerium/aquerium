import { updateQueryListAction } from "../actions/queryList";
import { queryListType } from "../state.types";
import update from "immutability-helper";

const DEFAULT_STATE: { queryList: queryListType } = { queryList: {} };

/**
 * Our reducer responds to the various actions regarding queryList
 * @param state the portion of the total state we are replacing
 * @param action the object of type addQueryAction or removeQueryAction
 */
export const queryList = (
  state: { queryList: queryListType } = DEFAULT_STATE,
  action: updateQueryListAction
) => {
  switch (action.type) {
    case "UPDATE_LIST": {
      const newList = action.updatedList;
      return update(state, {
        $set: {
          queryList: newList
        }
      });
    }
    default:
      return state;
  }
};
