import { addQueryAction, removeQueryAction } from "../actions/queryList";
import { queryListType, IQuery } from "../state.types";
import update from "immutability-helper";
/*
 * This file is responsible for the reducers that deal with the queryList
 */

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
      const actionQuery: IQuery = (action as addQueryAction).query;
      return update(state, {
        $set: {
          ...state,
          [actionQuery.name]: actionQuery
        }
      });
    }
    case "REMOVE_QUERY": {
      const actionQuery = (action as removeQueryAction).queryName;
      return update(state, { $unset: [actionQuery] });
    }
    default:
      return state;
  }
};
