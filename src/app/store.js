import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../features/modal/modalSlice'
import messageReducer from '../features/message/messageSlice'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    message: messageReducer
  }
})

export default store