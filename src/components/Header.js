import React, { useContext } from 'react'
import { ModalsContext } from '../App'

function Header() {
  const modalsContext = useContext(ModalsContext)
  const handleCreateTaskModalOpen = () => {
    modalsContext.dispatch({ type: 'createTaskSwitch', value: true })
  }
  
  return (
    <header>
        <h1>Todo list</h1>
        <button className='button-style-1' onClick={ handleCreateTaskModalOpen }>Create a task</button>
    </header>
  )
}

export default Header