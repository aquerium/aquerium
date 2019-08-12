import { IQuery } from "../state.types";

/*This file is responsible for actions that modify the state's queryList, like
 * addQuery
 * removeQuery
 */

/**
 * @type { type: string; query: IQuery } this type defines an action that adds a query to the queryList
 */
export type addQueryAction = { type: string; query: IQuery };

/**
 * @type { type: string; queryName: string } this type defines an action that removes a query from the queryList
 */
export type removeQueryAction = { type: string; queryName: string };

/**
 * Action creator to add a query to the queryList
 * @param { IQuery } query the particular query to be added
 */
export const addQuery = (query: IQuery) => ({
  type: "ADD_QUERY",
  query
});

/**
 * Action creator to specified query from queryList
 * @param {string} queryName the name of the query to be removed
 */
export const removeQuery = (queryName: string) => ({
  type: "REMOVE_QUERY",
  queryName
});
