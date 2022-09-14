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
    /**
     * When dispatching action, we'll pass an object with status property to control the status of modal.
     * The reason we passed object as payload is because in edit task modal we should pass the task as well
     * through action when dispatching
     */
    switchAboutModal: (state, action) => {
      state.aboutModalStatus = action.payload.status
    },
    switchCreateTaskModal: (state, action) => {
      state.createTaskModalStatus = action.payload.status
    },
    switchEditTaskModal: (state, action) => {
      state.editTaskModalStatus = action.payload.status
      state.taskToEdit = action.payload.task
    }
  }
})

export default modalSlice.reducer
export const { switchAboutModal, switchCreateTaskModal, switchEditTaskModal } = modalSlice.actions