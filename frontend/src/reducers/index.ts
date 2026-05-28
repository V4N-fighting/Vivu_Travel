import { combineReducers } from "redux";
import counterReducer from "./counter";


export const allReducers = combineReducers({
    counterReducer
  // add more reducers here
});
