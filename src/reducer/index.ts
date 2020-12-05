import { combineReducers } from "@reduxjs/toolkit";

import counter from "./counter";
import workspace from "./workspace";

const rootReducer = combineReducers({ workspace, counter });

export default rootReducer;
