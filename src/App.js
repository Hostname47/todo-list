import React, { useReducer } from "react";
import Header from "./components/Header";
import Messages from "./components/Messages";
import Todolist from "./components/Todolist";
import './css/App.css'
import AboutModal from './modals/AboutModal'
import CreateTaskModal from './modals/CreateTaskModal'
import EditTaskModal from './modals/EditTaskModal'

// Import reducers
import {modalsInitialState, modalsReducer} from './reducers/modalsReducer'
import {todolistInitialState, todolistReducer} from './reducers/todolistReducer'
import {messagesInitialState, messagesReducer} from './reducers/messagesReducer'

export const TodolistContext = React.createContext()
export const ModalsContext = React.createContext()
export const MessagesContext = React.createContext()

function App() {
  const [ modalsState, modalsDispatch ] = useReducer(modalsReducer, modalsInitialState)
  const [ todolistState, todolistDispatch ] = useReducer(todolistReducer, todolistInitialState)
  const [ messagesState, messagesDispatch ] = useReducer(messagesReducer, messagesInitialState)

  console.log('--- Render App ---')
  return (
    <TodolistContext.Provider value={{ state: todolistState, dispatch: todolistDispatch }}>
      <ModalsContext.Provider value={{ state: modalsState, dispatch: modalsDispatch }}>
        <MessagesContext.Provider value={{ state: messagesState, dispatch: messagesDispatch }}>
          <Header />
          <Messages />
          <Todolist />
          { <AboutModal status={ modalsState.about } /> }
          { <CreateTaskModal status={ modalsState.createTask }/> }
          { <EditTaskModal status={ modalsState.editTask } task={ modalsState.task } /> }
        </MessagesContext.Provider>
      </ModalsContext.Provider>
    </TodolistContext.Provider>
  )
}

export default App;
