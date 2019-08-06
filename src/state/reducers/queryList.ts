import { IQuery } from "../state.types";

/**
 * This file is responsible for the reducers that deal with the queryList
 */

const DEFAULT_STATE: { [key: string]: IQuery } = {};

/**
 * This is our actual reducer
 * It responds to the various actions regarding queryList
 * @param state
 * @param action
 */
export const queryList = (state: { [key: string]: IQuery } = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case "ADD_QUERY": {
      //append queryList element
      const updatedState = { ...state };
      updatedState[action.query.name] = action.query;
      return updatedState;
    }
    case "REMOVE_QUERY": {
      //Removes specific query from queryList
      const updatedState = { ...state };
      delete updatedState[action.queryName];
      return updatedState;
    }
    default:
      return state;
  }
};
