import { createStore, combineReducers } from "redux";
import modalReducer from "./modal/modalReducer";

const rootReducer = combineReducers({
  modal: modalReducer
});

const store = createStore(rootReducer)

export default store;
