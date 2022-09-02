import React, { useReducer } from "react";
import Header from "./components/Header";
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

function App() {
  const [modalsState, modalsDispatcher] = useReducer(modalsReducer, modalsInitialState)

  return (
    <ModalsContext.Provider value={ { state: modalsState, dispatch: modalsDispatcher } }>
      <div className="App">
          <Header  />
          <Todolist />
          { modalsState.createTask && <CreateTaskModal /> }
      </div>
    </ModalsContext.Provider>
  );
}

export default App;
