import { updateQueryListAction, toggleFlagAction } from "../actions";
import { queryListType } from "../state.types";
import update from "immutability-helper";

const DEFAULT_STATE: queryListType = {};

/**
 * This reducer responds to the actions regarding updating the queryList.
 */
export const queryList = (
  state: queryListType = DEFAULT_STATE,
  action: updateQueryListAction | toggleFlagAction
) => {
  switch (action.type) {
    case "UPDATE_LIST": {
      const { updatedList } = action as updateQueryListAction;
      return update(state, { $set: updatedList });
    }
    case "TOGGLE_FLAG": {
      const { query } = action as toggleFlagAction;
      return update(state, { query: { markedAsRead: { $set: !query.markedAsRead } } });
    }
    default:
      return state;
  }
};
