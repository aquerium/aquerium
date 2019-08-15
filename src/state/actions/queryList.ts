import { IQuery, IUserInfo, queryListType, IState } from "../state.types";
import update from "immutability-helper";
import { updateGist } from "../../api";
import { Dispatch } from "redux";
import { getQueryURL, getQueryTasks } from "../../utilities";
import { getQueryMapObj } from "../../api";

/**
 * @type { type: string } this type defines an action that updates the queryList
 */
export type updateQueryListAction = { type: string; updatedList: queryListType };

/**
 * Action creator to load the existing querymap from the gist, and then update the redux state upon success.
 */
export const loadQueryMap = () => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const userInfo: IUserInfo = getState().user;
    const response1 = await getQueryMapObj(userInfo);
    if (response1.errorCode || !response1.queryMap) {
      alert("Gist Loading Failed :(");
      return;
    } else {
      //we have a valid query map, and need to update the redux state with it.
      const list = response1.queryMap;
      dispatch(updateList(list));
    }
  };
};

/**
 * Action creator to add/edit a query to the queryList.
 * This action creator gets the resulting tasks from the attached query and stores them in a new query before putting it in the queryMap.
 */
export const editQuery = (query: IQuery) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const userInfo: IUserInfo = getState().user;
    const resp = await getQueryTasks(getQueryURL(userInfo, query));
    let newQuery = null;
    if (resp.errorCode || !resp.items) {
      alert("API request failed :(");
      return;
    } else {
      //we have a valid task array, and need to store it in our new query.
      newQuery = update(query, {
        tasks: { $set: resp.items }
      });
    }
    //once we have our new query, we need to store it in the queryMap, save it to gist, and update state.
    const list: queryListType = getState().queryList;
    const newList = update(list, { [newQuery.id]: { $set: newQuery } });
    const response = await updateGist(getState().user, newList);
    if (response.errorCode) {
      alert("API request failed :(");
      return;
    } else {
      dispatch(updateList(newList));
    }
  };
};

/**
 * Action creator to remove the specified query from queryList.
 */
export const removeQuery = (queryName: string) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    let list: queryListType = getState().queryList;
    const newList = update(list, { $unset: [queryName] });
    const response = await updateGist(getState().user, newList);
    if (response.errorCode) {
      alert("API request failed :(");
      return;
    } else {
      dispatch(updateList(newList));
    }
  };
};

/**
 * Action creator to replace the current queryList with the attatched queryList
 */
export const updateList = (updatedList: queryListType) => ({
  type: "UPDATE_LIST",
  updatedList
});
