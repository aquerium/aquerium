import { IQuery } from "../state.types";

/**
 * @type { type: string; query: IQuery } addQueryAction
 * This type defines an action that adds a query to the queryList
 */
export type addQueryAction = { type: string; query: IQuery };

/**
 * @type { type: string; queryName: string } addQueryAction
 * This type defines an action that removes a query from the queryList
 */
export type removeQueryAction = { type: string; queryID: string };

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
 * @param {string} queryID
 * The id of the query to be removed
 */
export const removeQuery = (queryID: string) => ({
  type: "REMOVE_QUERY",
  queryID
});
