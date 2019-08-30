import { IQuery, queryListType, IState } from "../state.types";
import update from "immutability-helper";
import { Dispatch } from "redux";
import { getQueryURLEndpoint, getQueryTasks, getQueryURLHTML } from "../../util/utilities";
import { createUid } from "../../util/uIDGenerator";

// This type defines an action that updates the queryList with updatedList.
export type updateQueryListAction = { type: string; updatedList: queryListType };

/**
 * Action creator to add/edit a query to the queryList.
 * This action creator gets the resulting tasks from the attached query and updates it before putting the query in the queryMap.
 */
export const addOrEditQuery = (query: IQuery) => {
  return async function (dispatch: Dispatch, getState: () => IState) {
    dispatch(setHomeLoadingTrue());
    const { user, queryList } = getState();
    const resp = await getQueryTasks(getQueryURLEndpoint(user, query));
    if (resp.errorCode || !resp.tasks) {
      dispatch(setHomeLoadingFalse());
      // TODO: add error response.
      return;
    }
    // We have a valid task array, and need to store it in our new query.
    const newQuery = update(query.id == "" ? getQueryNewID(queryList, query) : query, {
      tasks: { $set: resp.tasks },
      url: { $set: getQueryURLHTML(user, query) }
    });
    // Once we have our new query, we need to store it in the queryMap, save it to gist, and dispatch an action to update the state.
    const newList = update(queryList, { [newQuery.id]: { $set: newQuery } });
    const response = await updateGist(user, newList);
    if (response.errorCode) {
      // TODO: add error response.
      dispatch(setHomeLoadingFalse());
      return;
    } else {
      dispatch(updateMap(newList));
      dispatch(setHomeLoadingFalse());
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
  return async function (dispatch: Dispatch, getState: () => IState) {
    dispatch(setHomeLoadingTrue());
    const { queryList, user } = getState();
    const newList = update(queryList, { $unset: [queryID] });
    const response = await updateGist(user, newList);
    if (response.errorCode) {
      // TODO: add error response.
      dispatch(setHomeLoadingFalse());
      return;
    }
    dispatch(updateMap(newList));
    dispatch(setHomeLoadingFalse());
  };
};

/**
 * Action creator to reload all of the tasks from every query and re-render them in the home UI.
 */
export const refreshMap = () => {
  return async function (dispatch: Dispatch, getState: () => IState) {
    dispatch(setHomeLoadingTrue());
    const { user, queryList } = getState();
    for (const key in queryList) {
      const responseItems = await getQueryTasks(getQueryURLEndpoint(user, queryList[key]));
      if (responseItems.tasks) {
        const newQuery = update(queryList[key], {
          tasks: { $set: responseItems.tasks }
        });
        const newList = update(queryList, { [newQuery.id]: { $set: newQuery } });
        const response = await updateGist(user, newList);
        if (response.errorCode) {
          // TODO: add error response.
          dispatch(setHomeLoadingFalse());
          return;
        }
        const delayInMilliseconds = 700;
        setTimeout(function () {
          dispatch(setHomeLoadingFalse());
          dispatch(updateMap(newList));
        }, delayInMilliseconds);
      } else {
        //TODO add error handling
        dispatch(setHomeLoadingFalse());
        return;
      }
    }
    dispatch(setHomeLoadingFalse());
  };
};

/**
 * Action creator to replace the current queryList with the attatched queryList.
 */
export const updateMap = (updatedList: queryListType) => ({
  type: "UPDATE_LIST",
  updatedList
});
