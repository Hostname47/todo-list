import React from "react";
import Header from "./components/Header";
import Messages from "./components/Messages";
import Todolist from "./components/Todolist";
import './css/App.css'
// Import modals components
import AboutModal from './modals/AboutModal'
import CreateTaskModal from './modals/CreateTaskModal'
import EditTaskModal from './modals/EditTaskModal'

import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  console.log('--- Render App ---')
  return (
    <Provider store={ store }>
      <Header />
      <Messages />
      <Todolist />
      <AboutModal />
      <CreateTaskModal />
      <EditTaskModal />
    </Provider>
  )
}

export default App;
