import { combineReducers } from "redux";
import { queryList } from "./queryList";
import { changeUI } from "./changeUI";

export const rootReducer = combineReducers({ queryList, changeUI });
