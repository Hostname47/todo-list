import React, { useState } from "react";
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
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/themes";
import GlobalStyles from "./components/styles/GlobalStyles";
import StyledApp from "./components/styles/StyledApp.styled";

function App() {
  const currentTheme = localStorage.getItem('theme') || 'light'
  const [theme, setTheme] = useState(currentTheme)

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }
  const themeObject = currentTheme === 'light' ? lightTheme : darkTheme
  
  console.log('--- Render App ---')
  return (
    <Provider store={ store }>
      <ThemeProvider theme={ themeObject }>
        <StyledApp>
          <GlobalStyles />
          <Header toggleTheme={ toggleTheme } />
          <Messages />
          <Todolist />
          <AboutModal />
          <CreateTaskModal />
          <EditTaskModal />
        </StyledApp>
      </ThemeProvider>
    </Provider>
  )
}

export default App;
