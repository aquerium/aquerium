import { IQuery, IUserInfo, queryListType, IState } from "../state.types";
import update from "immutability-helper";
import { updateGist } from "../../api";
import { Dispatch } from "redux";

/**
 * @type { type: string } this type defines an action that updates the queryList
 */
export type updateQueryListAction = { type: string; updatedList: queryListType };

/**
 * Action creator to add a query to the queryList
 * @param { IQuery } query the particular query to be added
 */
export const addQuery = (query: IQuery) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    const list: queryListType = getState().queryList;
    const newList = update(list, {
      $set: {
        ...list,
        [query.id]: query
      }
    });
    const response = await updateGist(getState().userInfo, newList);
    if (response.errorCode) {
      //what should we do if the api fails?
      alert("API request failed :(");
    } else {
      dispatch(updateList(newList));
    }
  };
};

/**
 * Action creator to remove a query from the queryList
 * @param { string } queryName the name of the query to be removed
 */
export const removeQuery = (queryName: string) => {
  return async function(dispatch: Dispatch, getState: () => IState) {
    let list: queryListType = getState().queryList;
    const newList = update(list, { $unset: [queryName] });
    const response = await updateGist(getState().userInfo, newList);
    if (response.errorCode) {
      alert("API request failed :(");
    } else {
      dispatch(updateList(newList));
    }
  };
};

export const updateList = (updatedList: queryListType) => ({
  type: "UPDATE_LIST",
  updatedList
});
