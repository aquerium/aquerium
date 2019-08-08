import { IQuery } from "../state.types";

/*This file is responsible for actions that modify the state's queryList, like
 * addQuery
 * removeQuery
 */

/**
 * Action creator to add a query to the queryList
 * @param { IQuery } query
 * The particular query to be added
 */
export const addQuery = (query: IQuery) => ({
  type: "ADD_QUERY",
  query
});

/**
 * Action creator to specified query from queryList
 * @param {string} queryName
 * The name of the query to be removed
 */
export const removeQuery = (queryName: string) => ({
  type: "REMOVE_QUERY",
  queryName
});
