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
  const [messages, messagesDispatcher] = useReducer(messagesReducer, messagesInitialState)

  return (
    <ModalsContext.Provider value={ { state: modals, dispatch: modalsDispatcher } }>
      <MessagesContext.Provider value={ { state: messages, dispatch: messagesDispatcher } }>
        <div className="App">
            <Header  />
              { messages.regular && (
                <div className='text-info-section'>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M129,233.33h-108c-13.79,0-18.82-8.86-11.87-20.89q54-93.6,108.12-187.2c7.34-12.71,17.14-12.64,24.55.17,36,62.4,71.95,124.88,108.27,187.13,7.05,12.07-.9,21.28-12.37,21.06C201.43,232.88,165.21,233.33,129,233.33Zm91.36-24L129.4,51.8,38.5,209.3Zm-79-103.77c-.13-7.56-5.28-13-12-12.85s-11.77,5.58-11.82,13.1q-.13,20.58,0,41.18c.05,7.68,4.94,13,11.69,13.14,6.92.09,12-5.48,12.15-13.39.09-6.76,0-13.53,0-20.29C141.35,119.45,141.45,112.49,141.32,105.53Zm-.15,70.06a12.33,12.33,0,0,0-10.82-10.26,11.29,11.29,0,0,0-12,7.71,22.1,22.1,0,0,0,0,14A11.82,11.82,0,0,0,131.4,195c6.53-1.09,9.95-6.11,9.81-14.63A31.21,31.21,0,0,0,141.17,175.59Z"></path></svg>
                  <span className='text'>{ messages.regular }</span>
                  <button className='close' onClick={ () => messagesDispatcher({ type: 'regular', value: '' }) }>
                    <svg className="x" viewBox="0 0 24 24"><path d="M20.46.73,12,9.18,3.54.73.72,3.54,9.18,12,.72,20.46l2.82,2.81L12,14.82l8.46,8.45,2.82-2.81L14.82,12l8.46-8.46Z"/></svg>
                  </button>
                </div>
              ) }
              { messages.success && (
                <div className='text-info-section success'>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M129,233.33h-108c-13.79,0-18.82-8.86-11.87-20.89q54-93.6,108.12-187.2c7.34-12.71,17.14-12.64,24.55.17,36,62.4,71.95,124.88,108.27,187.13,7.05,12.07-.9,21.28-12.37,21.06C201.43,232.88,165.21,233.33,129,233.33Zm91.36-24L129.4,51.8,38.5,209.3Zm-79-103.77c-.13-7.56-5.28-13-12-12.85s-11.77,5.58-11.82,13.1q-.13,20.58,0,41.18c.05,7.68,4.94,13,11.69,13.14,6.92.09,12-5.48,12.15-13.39.09-6.76,0-13.53,0-20.29C141.35,119.45,141.45,112.49,141.32,105.53Zm-.15,70.06a12.33,12.33,0,0,0-10.82-10.26,11.29,11.29,0,0,0-12,7.71,22.1,22.1,0,0,0,0,14A11.82,11.82,0,0,0,131.4,195c6.53-1.09,9.95-6.11,9.81-14.63A31.21,31.21,0,0,0,141.17,175.59Z"></path></svg>
                  <span className='text'>{ messages.success }</span>
                  <button className='close' onClick={ () => messagesDispatcher({ type: 'success', value: '' }) }>
                    <svg className="x" viewBox="0 0 24 24"><path d="M20.46.73,12,9.18,3.54.73.72,3.54,9.18,12,.72,20.46l2.82,2.81L12,14.82l8.46,8.45,2.82-2.81L14.82,12l8.46-8.46Z"/></svg>
                  </button>
                </div>
              ) }
              { messages.error && (
                <div className='text-info-section error'>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M129,233.33h-108c-13.79,0-18.82-8.86-11.87-20.89q54-93.6,108.12-187.2c7.34-12.71,17.14-12.64,24.55.17,36,62.4,71.95,124.88,108.27,187.13,7.05,12.07-.9,21.28-12.37,21.06C201.43,232.88,165.21,233.33,129,233.33Zm91.36-24L129.4,51.8,38.5,209.3Zm-79-103.77c-.13-7.56-5.28-13-12-12.85s-11.77,5.58-11.82,13.1q-.13,20.58,0,41.18c.05,7.68,4.94,13,11.69,13.14,6.92.09,12-5.48,12.15-13.39.09-6.76,0-13.53,0-20.29C141.35,119.45,141.45,112.49,141.32,105.53Zm-.15,70.06a12.33,12.33,0,0,0-10.82-10.26,11.29,11.29,0,0,0-12,7.71,22.1,22.1,0,0,0,0,14A11.82,11.82,0,0,0,131.4,195c6.53-1.09,9.95-6.11,9.81-14.63A31.21,31.21,0,0,0,141.17,175.59Z"></path></svg>
                  <span className='text'>{ messages.error }</span>
                  <button className='close' onClick={ () => messagesDispatcher({ type: 'error', value: '' }) }>
                    <svg className="x" viewBox="0 0 24 24"><path d="M20.46.73,12,9.18,3.54.73.72,3.54,9.18,12,.72,20.46l2.82,2.81L12,14.82l8.46,8.45,2.82-2.81L14.82,12l8.46-8.46Z"/></svg>
                  </button>
                </div>
              ) }
            <Todolist />
            { modals.createTask && <CreateTaskModal /> }
        </div>
      </MessagesContext.Provider>
    </ModalsContext.Provider>
  );
}

export default App;
