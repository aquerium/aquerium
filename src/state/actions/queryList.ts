/*global chrome*/
import { IQuery, queryListType, IState } from "../state.types";
import update from "immutability-helper";
import { Dispatch } from "redux";
import { createUid, getQueryTasks, getQueryURLHTML, updateGist } from "../../util";
import { setHomeLoadingTrue, setHomeLoadingFalse } from "./";
import { toError } from "../actions";

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
    const resp = await getQueryTasks(user, query);
    if (resp.errorCode || !resp.tasks) {
      dispatch(setHomeLoadingFalse());
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
      dispatch(setHomeLoadingFalse());
      toError(resp.errorCode, query)(dispatch);
      return;
    } else {
      dispatch(setHomeLoadingFalse());
    }
    chrome.browserAction.getBadgeText({}, function (res: string) {
      const oldOverFlow = query.tasks.length - query.reasonableCount;
      const overFlow = newQuery.tasks.length - newQuery.reasonableCount;
      const newBadgeText = query.id === "" ? Number(res) + overFlow : Number(res) + (overFlow - oldOverFlow);
      chrome.browserAction.setBadgeText({ text: newBadgeText.toString() });
    });
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
      dispatch(setHomeLoadingFalse());
      toError(response.errorCode)(dispatch);
      return;
    }
    chrome.browserAction.getBadgeText({}, function (res: string) {
      const query = queryList[queryID];
      const overFlow = query.tasks.length - query.reasonableCount;
      const newBadgeText = (Number(res) - overFlow) < 0 ? 0 : (Number(res) - overFlow);
      chrome.browserAction.setBadgeText({ text: newBadgeText.toString() });
    });
    dispatch(setHomeLoadingFalse());
    dispatch(updateMap(newList));
  };
};

/**
 * Action creator to reload all of the tasks from every query and re-render them in the home UI.
 */
export const refreshMap = () => {
  return async function (dispatch: Dispatch, getState: () => IState) {
    dispatch(setHomeLoadingTrue());
    const { user, queryList } = getState();
    let badge = 0;
    if (queryList) {
      const newMap = JSON.parse(JSON.stringify(queryList));
      for (const key in queryList) {
        const responseItems = await getQueryTasks(user, queryList[key]);
        if (responseItems.tasks) {
          // Set the contents with the most updated query result.
          newMap[key].tasks = responseItems.tasks;
          // Add the number of "unreasonable" tasks to the badge count.
          badge += responseItems.tasks.length - newMap[key].reasonableCount;
        }
        else {
          dispatch(setHomeLoadingFalse());
          toError(responseItems.errorCode)(dispatch);
        }
      }
      const badgeText = badge < 0 ? "0" : badge.toString(); // Prevents displaying negative badges.
      chrome.browserAction.setBadgeText({ text: badgeText });
      // Call updateGist if there were indeed updates to the user's query results.
      if (JSON.stringify(queryList) !== JSON.stringify(newMap)) {
        const responseGist = await updateGist(user, newMap);
        if (responseGist.errorCode) {
          dispatch(setHomeLoadingFalse());
          toError(responseGist.errorCode)(dispatch);
        }
      }
      dispatch(setHomeLoadingFalse());
      dispatch(updateMap(newMap));
    }
  }
}


/**
 * Action creator to replace the current queryList with the attatched queryList.
 */
export const updateMap = (updatedList: queryListType) => ({
  type: "UPDATE_LIST",
  updatedList
});
