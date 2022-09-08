import { SWITCH_ABOUT_MODAL, SWITCH_CREATE_TASK_MODAL, SWITCH_EDIT_TASK_MODAL } from './modalActionsTypes'

const initialState = {
  aboutModalStatus: false,
  createTaskModalStatus: false,
  editTaskModalStatus: false,
  taskToEdit: {}
}

const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case SWITCH_ABOUT_MODAL:
      return { ...state, aboutModalStatus: action.status }
    case SWITCH_CREATE_TASK_MODAL:
      return { ...state, createTaskModalStatus: action.status }
    case SWITCH_EDIT_TASK_MODAL:
      return { ...state, editTaskModalStatus: action.status, taskToEdit: action.taskToEdit }
    default: return state
  }
}

export default modalReducer