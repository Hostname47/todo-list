import React, { useState } from "react";
import Header from "./components/Header";
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
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Notes from "./components/pages/Notes";
import NotFound from "./components/pages/NotFound";

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

          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='notes' element={ <Notes /> } />
            <Route path='*' element={ <NotFound /> } />
          </Routes>

          <AboutModal />
          <CreateTaskModal />
          <EditTaskModal />
        </StyledApp>
      </ThemeProvider>
    </Provider>
  )
}

export default App;
