import { addQueryAction, removeQueryAction } from "../actions/queryList";
import { queryListType, IQuery } from "../state.types";
import update from "immutability-helper";

const DEFAULT_STATE: queryListType = {};

export const queryList = (
  state: queryListType = DEFAULT_STATE,
  action: addQueryAction | removeQueryAction
) => {
  /**
   * Our reducer responds to the various actions regarding queryList
   * @param state
   * the portion of the total state we are replacing
   * @param action
   * The object of type addQueryAction or removeQueryAction
   */
  switch (action.type) {
    case "ADD_QUERY": {
      const actionQuery: IQuery = (action as addQueryAction).query;
      return update(state, {
        $set: {
          ...state,
          [actionQuery.id]: actionQuery
        }
      });
    }
    case "REMOVE_QUERY": {
      const actionQueryID = (action as removeQueryAction).queryID;
      return update(state, { $unset: [actionQueryID] });
    }
    default:
      return state;
  }
};
