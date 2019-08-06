import { combineReducers } from "redux";
import { queryList } from "./queryList"; //hehe can't write this yet! We need import what we're writing in the reducer
import { changeUI } from "./changeUI";

export const rootReducer = combineReducers({ queryList, changeUI });
