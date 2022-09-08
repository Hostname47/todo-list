import { SWITCH_ABOUT_MODAL, SWITCH_EDIT_TASK_MODAL } from './modalActionsTypes'
import { SWITCH_CREATE_TASK_MODAL } from './modalActionsTypes'

export const switchAboutModal = (switchTo) => {
  return {
    type: SWITCH_ABOUT_MODAL,
    status: switchTo
  }
}

export const switchCreateTaskModal = (switchTo) => {
  return {
    type: SWITCH_CREATE_TASK_MODAL,
    status: switchTo
  }
}

export const switchEditTaskModal = (switchTo, task={}) => {
  return {
    type: SWITCH_EDIT_TASK_MODAL,
    status: switchTo,
    taskToEdit: task
  }
}