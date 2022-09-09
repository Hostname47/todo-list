import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import modalReducer from "./modal/modalReducer";
import todolistReducer from "./todolist/todolistReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  todolist: todolistReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;
