import { addQueryAction, removeQueryAction } from "../actions/queryList";
import { queryListType, IQuery } from "../state.types";
import update from "immutability-helper";

const DEFAULT_STATE: queryListType = {};

/**
 * Our reducer responds to the various actions regarding queryList
 * @param state the portion of the total state we are replacing
 * @param action the object of type addQueryAction or removeQueryAction
 */
export const queryList = (
  state: queryListType = DEFAULT_STATE,
  action: addQueryAction | removeQueryAction
) => {
  switch (action.type) {
    case "ADD_QUERY": {
      const { query } = action as addQueryAction;
      return update(state, {
        $set: {
          ...state,
          [query.id]: query
        }
      });
    }
    case "REMOVE_QUERY": {
      const { queryID } = action as removeQueryAction;
      return update(state, { $unset: [queryID] });
    }
    default:
      return state;
  }
};
