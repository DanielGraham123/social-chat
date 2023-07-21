import { combineReducers } from "redux";

import authReducer from "./AuthReducer.js";
import chatUserReducer from "./ChatUserReducer.js";

export const reducers = combineReducers({ authReducer, chatUserReducer });
