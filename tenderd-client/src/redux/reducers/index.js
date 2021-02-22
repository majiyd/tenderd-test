import { combineReducers } from "redux";
import companyReducer from "./companyReducer";
import requestsReducer from "./requestsReducer";
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";

/**
 * @desc all the app reducers are combined into a single via redux's combineReducers
 * @returns rootReducer
 *
 */
const rootReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
  requests: requestsReducer,
  ui: uiReducer,
});

export default rootReducer;
