import React, { useReducer } from "react";
import Header from "./components/Header";
import Messages from "./components/Messages";
import Todolist from "./components/Todolist";
import './css/App.css'
import CreateTaskModal from "./modals/CreateTaskModal";

// Import reducers
import { modalsInitialState, modalsReducer} from './reducers/modalsReducer'
import { messagesInitialState, messagesReducer} from './reducers/messagesReducer'

export const ModalsContext = React.createContext()
export const TodolistContext = React.createContext()
export const MessagesContext = React.createContext()

const todolistInitialState = {
  tasks: [],
  loading: true,
  error: '',
  refresh: false
}

const todolistReducer = (state, action) => {
  switch(action.type) {
    case 'refresh':
      // Just a workaround til I find a better way to refresh components
      console.log('hatch')
      return { ...state, refresh: !state.refresh }
    case 'setLoading':
      return { ...state, loading: action.loading }
    case 'fillTasks':
      return { ...state, tasks: action.tasks }
    default:
      return state
  }
}

function App() {
  const [modals, modalsDispatcher] = useReducer(modalsReducer, modalsInitialState)
  const [messages, messagesDispatch] = useReducer(messagesReducer, messagesInitialState)
  const [todolist, todoDispatch] = useReducer(todolistReducer, todolistInitialState)
  console.log('render App')
  return (
    <ModalsContext.Provider value={ { state: modals, dispatch: modalsDispatcher } }>
      <MessagesContext.Provider value={ { state: messages, dispatch: messagesDispatch } }>
        <TodolistContext.Provider value={ { state: todolist, dispatch: todoDispatch } }>
          <div className="App">
              <Header  />
              <Messages messages={ messages } dispatch={ messagesDispatch } />
              <Todolist />
              { modals.createTask && <CreateTaskModal todolistDispatch={ todoDispatch } /> }
          </div>
        </TodolistContext.Provider>
      </MessagesContext.Provider>
    </ModalsContext.Provider>
  );
}

export default App;
