import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import messageReducer from "./message/messageReducer";
import modalReducer from "./modal/modalReducer";
import todolistReducer from "./todolist/todolistReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  todolist: todolistReducer,
  message: messageReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;
