
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
  editTask: false,
  deleteTask: false,
  item: {}
}
const modalsReducer = (state, action) => {
  switch(action.type) {
    case 'createTaskSwitch':
      return { ...state, createTask: action.value }
    case 'editTaskSwitch':
      return { ...state, editTask: action.value, item: action.item }
    case 'deleteTaskSwitch':
      return { ...state, deleteTask: action.value }
    default:
      return state
  }
}
export { modalsInitialState, modalsReducer }