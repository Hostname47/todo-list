import React, { useReducer } from "react";
import Header from "./components/Header";
import Messages from "./components/Messages";
import Todolist from "./components/Todolist";
import './css/App.css'
import CreateTaskModal from "./modals/CreateTaskModal";

/**
 * The reason we used reducer here instead of useState is that we need to handle
 * multiple modals and we want to pass a single dispatch method that will trigger
 * modal switch action depend on the modal we want to open or close
 * 
 * Also we share the dispatch method through context to header and to every modal
 * component in order to be able to open and close the targeted modal
 */
const modalsInitialState = {
  createTask: false
}
const modalsReducer = (state, action) => {
  switch(action.type) {
    case 'createTaskSwitch':
      return { ...state, createTask: action.value }
    // Other modals cases later
    default:
      return state
  }
}
export const ModalsContext = React.createContext()

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
export const MessagesContext = React.createContext()

function App() {
  const [modals, modalsDispatcher] = useReducer(modalsReducer, modalsInitialState)
  const [messages, messagesDispatch] = useReducer(messagesReducer, messagesInitialState)

  return (
    <ModalsContext.Provider value={ { state: modals, dispatch: modalsDispatcher } }>
      <MessagesContext.Provider value={ { state: messages, dispatch: messagesDispatch } }>
        <div className="App">
            <Header  />
            <Messages messages={ messages } dispatch={ messagesDispatch } />
            <Todolist />
            { modals.createTask && <CreateTaskModal /> }
        </div>
      </MessagesContext.Provider>
    </ModalsContext.Provider>
  );
}

export default App;
