import { SWITCH_ABOUT_MODAL } from './modalActionsTypes'

const initialState = {
  aboutModalStatus: false
}

const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case SWITCH_ABOUT_MODAL:
      return { ...state, aboutModalStatus: action.status }
    default: return state
  }
}

export default modalReducer