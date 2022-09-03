
/**
 * The reason we used reducer here instead of useState is that we need to handle
 * multiple modals and we want to pass a single dispatch method that will trigger
 * modal switch action depend on the modal we want to open or close
 * 
 * Also we share the dispatch method through context to header and to every modal
 * component in order to be able to open and close the targeted modal
 */
const modalsInitialState = {
  createTask: false,
  updateTask: false,
  deleteTask: false,
}
const modalsReducer = (state, action) => {
  switch(action.type) {
    case 'createTaskSwitch':
      return { ...state, createTask: action.value }
    case 'updateTaskSwitch':
      return { ...state, updateTask: action.value }
    case 'deleteTaskSwitch':
      return { ...state, deleteTask: action.value }
    default:
      return state
  }
}
export { modalsInitialState, modalsReducer }