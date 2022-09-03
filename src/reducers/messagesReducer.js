const messagesInitialState = {
  error: '',
  success: '',
  regular: ''
}
const messagesReducer = (state, action) => {
  switch(action.type) {
    case 'success':
      return { ...state, success: action.value }
    case 'error':
      return { ...state, error: action.value }
    case 'regular':
      return { ...state, regular: action.value }
    default:
      return state
  }
}

export { messagesInitialState, messagesReducer }