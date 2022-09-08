import { SWITCH_ABOUT_MODAL } from './modalActionsTypes'

export const switchAboutModal = (switchTo) => {
  return {
    type: SWITCH_ABOUT_MODAL,
    status: switchTo
  }
}