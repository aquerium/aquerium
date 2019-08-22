import { IQuery, IUserInfo, queryListType, IState } from "../state.types";
import update from "immutability-helper";
import { updateGist } from "../../util/api";
import { Dispatch } from "redux";
import { getQueryURLEndpoint, getQueryTasks } from "../../util/utilities";
import { isHomeLoadingTrue, isHomeLoadingFalse } from "./changeUI";

/**
 * @type { type: string } this type defines an action that updates the queryList
 */
export type updateQueryListAction = { type: string; updatedList: queryListType };

/**
 * Action creator to add/edit a query to the queryList.
 * This action creator gets the resulting tasks from the attached query and stores them in a new query before putting it in the queryMap.
 */

export const editQuery = (query: IQuery) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const userInfo: IUserInfo = getState().user;
    //call loading start, and end it in various places
    dispatch(isHomeLoadingTrue());
    const resp = await getQueryTasks(getQueryURLEndpoint(userInfo, query));
    let newQuery = undefined;
    if (resp.errorCode || !resp.tasks) {
      dispatch(isHomeLoadingFalse());
      //some error
      return;
    } else {
      //we have a valid task array, and need to store it in our new query.
      newQuery = update(query, {
        tasks: { $set: resp.tasks }
      });
    }
    //once we have our new query, we need to store it in the queryMap, save it to gist, and dispatch an action to update the state.
    const list: queryListType = getState().queryList;
    const newList = update(list, { [query.id]: { $set: !newQuery ? query : newQuery } });
    const response = await updateGist(getState().user, newList);
    dispatch(isHomeLoadingFalse()); //is this too early?
    if (response.errorCode) {
      return;
    } else {
      dispatch(updateMap(newList));
    }
  };
};

/**
 * Action creator to remove the specified query from queryList.
 */
export const removeQuery = (queryID: string) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    let list: queryListType = getState().queryList;
    const newList = update(list, { $unset: [queryID] });
    dispatch(isHomeLoadingTrue());
    const response = await updateGist(getState().user, newList);
    dispatch(isHomeLoadingFalse()); //too early?
    if (response.errorCode) {
      alert("API request failed :(");
      return;
    } else {
      dispatch(updateMap(newList));
    }
  };
};

/**
 * Action creator to replace the current queryList with the attatched queryList
 */
export const updateMap = (updatedList: queryListType) => ({
  type: "UPDATE_LIST",
  updatedList
});
