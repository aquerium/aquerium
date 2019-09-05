import { IQuery, queryListType, IState } from "../state.types";
import update from "immutability-helper";
import { Dispatch } from "redux";
import {
  getQueryURLEndpoint,
  getQueryTasks,
  getQueryURLHTML,
  updateGist,
  createUid
} from "../../util";
import { toError } from "../actions";

// This type defines an action that updates the queryList with updatedList.
export type updateQueryListAction = { type: string; updatedList: queryListType };

// This type defines an action that toggles the marked as read flag
export type toggleFlagAction = { type: string; query: IQuery };

/**
 * Action creator to add/edit a query to the queryList.
 * This action creator gets the resulting tasks from the attached query and updates it before putting the query in the queryMap.
 */
export const addOrEditQuery = (query: IQuery) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const { user, queryList } = getState();
    const resp = await getQueryTasks(getQueryURLEndpoint(user, query));
    if (resp.errorCode || !resp.tasks) {
      toError(resp.errorCode, query)(dispatch);
      return;
    }
    // We have a valid task array, and need to store it in our new query.
    const newQuery = update(query.id === "" ? getQueryNewID(queryList, query) : query, {
      tasks: { $set: resp.tasks },
      url: { $set: getQueryURLHTML(user, query) }
    });
    // Once we have our new query, we need to store it in the queryMap, save it to gist, and dispatch an action to update the state.
    const newList = update(queryList, { [newQuery.id]: { $set: newQuery } });
    const response = await updateGist(user, newList);
    if (response.errorCode) {
      toError(resp.errorCode, query)(dispatch);
      return;
    }
    dispatch(updateMap(newList));
  };
};

/**
 * This helper function returns the query it was given with a unique ID number.
 */
function getQueryNewID(queryList: queryListType, query: IQuery): IQuery {
  let newID: string = createUid();
  while (queryList.hasOwnProperty(newID)) {
    newID = createUid();
  }
  const newQuery = update(query, { id: { $set: newID } });
  return newQuery;
}

/**
 * Action creator to remove the specified query from queryList.
 */
export const removeQuery = (queryID: string) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const { queryList, user } = getState();
    const newList = update(queryList, { $unset: [queryID] });
    const response = await updateGist(user, newList);
    if (response.errorCode) {
      toError(response.errorCode)(dispatch);
      return;
    }
    dispatch(updateMap(newList));
  };
};

/**
 * Action creator to replace the current queryList with the attached queryList.
 */
export const updateMap = (updatedList: queryListType) => ({
  type: "UPDATE_LIST",
  updatedList
});

/**
 * Action creator to toggle the markedAsRead flag (for reasonable count).
 */
export const toggleFlag = (query: IQuery) => ({
  type: "TOGGLE_FLAG",
  query
});
