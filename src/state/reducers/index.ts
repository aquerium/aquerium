import { combineReducers } from "redux";
import { queryList } from "./queryList";
import { changeUI } from "./changeUI";
import { userInfo } from "./userInfo";
import { setValidPAT } from "./setValidPAT";

export const rootReducer = combineReducers({ queryList, changeUI, userInfo, setValidPAT });
