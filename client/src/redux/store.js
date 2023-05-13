import { createStore, combineReducers } from "redux";
// import { createStore } from "redux";
import themeReducer from "./themeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  themeReducer,
  userReducer,
});

const store = createStore(rootReducer);
// const store2 = createStore(userReducer);

export default store;
