import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aboutModalStatus: false,
  createTaskModalStatus: false,
  editTaskModalStatus: false,
  taskToEdit: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    switchAboutModal: (state, action) => {
      /**
       * When dispatching action, we'll pass an object with status property to control the status of modal.
       * The reason we passed object as payload is because in edit task modal we should pass the task as well
       * through action when dispatching
       */
      state.aboutModalStatus = action.payload.status
    }
  }
})

export default modalSlice.reducer
export const { switchAboutModal } = modalSlice.actions