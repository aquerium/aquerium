import { IQuery, queryListType, IState } from "../state.types";
import update from "immutability-helper";
import { updateGist } from "../../util/api";
import { Dispatch } from "redux";
import { getQueryURLEndpoint, getQueryTasks } from "../../util/utilities";

// This type defines an action that updates the queryList with updatedList.
export type updateQueryListAction = { type: string; updatedList: queryListType };

/**
 * Action creator to add/edit a query to the queryList.
 * This action creator gets the resulting tasks from the attached query and updates it before putting the query in the queryMap.
 */
export const addOrEditQuery = (query: IQuery) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const { user, queryList } = getState();
    const resp = await getQueryTasks(getQueryURLEndpoint(user, query));
    if (resp.errorCode || !resp.tasks) {
      // TODO: add error response.
      return;
    }
    // We have a valid task array, and need to store it in our new query.
    let newQuery = update(query, {
      tasks: { $set: resp.tasks }
    });
    // Once we have our new query, we need to store it in the queryMap, save it to gist, and dispatch an action to update the state.
    const newList = update(queryList, { [newQuery.id]: { $set: newQuery } });
    const response = await updateGist(user, newList);
    if (response.errorCode) {
      // TODO: add error response.
      return;
    }
    dispatch(updateMap(newList));
  };
};

/**
 * Action creator to remove the specified query from queryList.
 */
export const removeQuery = (queryID: string) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const { queryList, user } = getState();
    const newList = update(queryList, { $unset: [queryID] });
    const response = await updateGist(user, newList);
    if (response.errorCode) {
      // TODO: add error response.
      return;
    }
    dispatch(updateMap(newList));
  };
};

/**
 * Action creator to reload all of the tasks from every query and re-render them in the home UI.
 */
export const refreshMap = () => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const { user, queryList } = getState();
    for (const key in queryList) {
      const responseItems = await getQueryTasks(getQueryURLEndpoint(user, queryList[key]));
      if (responseItems.tasks) {
        const newQuery = update(queryList[key], {
          tasks: { $set: responseItems.tasks }
        });
        const newList = update(queryList, { [newQuery.id]: { $set: newQuery } });
        dispatch(updateMap(newList));
      } else {
        //TODO add error handling
        return;
      }
    }
  };
};

/**
 * Action creator to replace the current queryList with the attatched queryList.
 */
export const updateMap = (updatedList: queryListType) => ({
  type: "UPDATE_LIST",
  updatedList
});
