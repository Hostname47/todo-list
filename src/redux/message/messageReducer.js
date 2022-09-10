import { SWITCH_MESSAGE_STATUS } from "./messageActionTypes";

const initialState = {
  status: false,
  message: '',
  type: 'regular',
}

const messageReducer = (state=initialState, action) => {
  switch(action.type) {
    case SWITCH_MESSAGE_STATUS:
      return { ...state, status: action.status, type: action.messageType, message: action.message }
    default: return state
  }
}

export default messageReducer