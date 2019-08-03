import { IState, IQuery, ITask } from "../state.types";

/**
 * This file is responsible for the reducers that deal with the queryList
 */

/**
 * We need to have a default state for when we first start the application
 * Type: IState
 */
const DEFAULT_STATE: { [key: string]: IQuery } = {};

DEFAULT_STATE["query1"] = {
  //DEFAULT_STATE stores a number of objects
  name: "query 1",
  numTasks: 4,
  stalenessIssue: 165,
  stalenessPull: 1535,
  tasks: [
    {
      num: 131,
      title: "Fabric doesn't work",
      type: "issue",
      state: "closed",
      createdAt: "some time",
      updatedAt: "some time, not as long ago"
    }
  ]
};
DEFAULT_STATE["Hi, Cathy"] = {
  name: "Hi, Cathy",
  numTasks: 6,
  stalenessIssue: 165,
  stalenessPull: 1535,
  tasks: [
    {
      num: 131,
      title: "Fabric doesn't work",
      type: "issue",
      state: "closed",
      createdAt: "some time",
      updatedAt: "some time, not as long ago"
    }
  ]
};

/**
 * This is our actual reducer
 * It responds to the various actions regarding queryList
 * @param state
 * @param action
 */
export const queryList = (state: { [key: string]: IQuery } = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case "ADD_QUERY": {
      //append queryList element (needs arg)
      const updatedState = { ...state };
      updatedState[action.query.name] = action.query;
      return updatedState;
    }
    case "REMOVE_QUERY": {
      //Removes specific query from queryList (needs arg)
      const updatedState = { ...state };
      delete updatedState[action.query.name];
      return updatedState;
    }
    case "EDIT_QUERY": {
      // Edits specific query in queryList (needs arg)
      return state; //no actions yet :(
    }
    default:
      return state;
  }
};
