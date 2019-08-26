import { combineReducers } from "redux";
import { queryList } from "./queryList";
import { changeUI } from "./changeUI";
import { user } from "./userInfo";

export const rootReducer = combineReducers({ queryList, changeUI, user });
