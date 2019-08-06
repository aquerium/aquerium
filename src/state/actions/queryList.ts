import { IQuery } from "../state.types";

/**This file is responsible for actions that modify the state's queryList, like
 * addQuery
 * removeQuery
 * editQuery
 */

/**
 * Action to add a query to the queryList
 * @param query
 */
export const addQuery = (query: IQuery) => ({
  type: "ADD_QUERY",
  query
});

/**
 * Action to specified query from queryList
 * @param query
 */
export const removeQuery = (queryName: string) => ({
  type: "REMOVE_QUERY",
  queryName
});
