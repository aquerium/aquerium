import { IQuery, IUserInfo, queryListType, IState } from "../state.types";
import update from "immutability-helper";
import { updateGist } from "../../api";
import { Dispatch } from "redux";
import { getQueryURL, getQueryTasks } from "../../utilities";

/**
 * @type { type: string } this type defines an action that updates the queryList
 */
export type updateQueryListAction = { type: string; updatedList: queryListType };

/**
 * Action creator to load the attatched query to the gist, and then update the redux state upon success.
 */
export const loadQueryMap = (list: queryListType) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const response = await updateGist(getState().user, list);
    if (response.errorCode) {
      alert("API request failed :(");
      return;
    } else {
      dispatch(updateList(list));
    }
  };
};

/**
 * Action creator to add/edit a query to the queryList.
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
      newQuery = update(query, {
        tasks: { $set: resp.items }
      });
    }

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

export const updateList = (updatedList: queryListType) => ({
  type: "UPDATE_LIST",
  updatedList
});
