import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../features/modal/modalSlice'
import messageReducer from '../features/message/messageSlice'
import todolistReducer from '../features/todolist/todolistSlice'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    message: messageReducer,
    todolist: todolistReducer
  }
})

export default store