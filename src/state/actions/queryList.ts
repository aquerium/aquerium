import { IQuery } from "../state.types";

/**
 * The action that adds a query to the queryList.
 */
export type addQueryAction = { type: string; query: IQuery };

/**
 * The action that removes a query from the queryList.
 */
export type removeQueryAction = { type: string; queryID: string };

/**
 * Action creator to add a query to the queryList.
 */
export const addQuery = (query: IQuery) => ({
  type: "ADD_QUERY",
  query
});

/**
 * Action creator to remove the specified query from queryList.
 */
export const removeQuery = (queryID: string) => ({
  type: "REMOVE_QUERY",
  queryID
});
