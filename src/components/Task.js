import React, { useState } from 'react'

function Task({ item }) {
  const [done, setDone] = useState(item.done)

  const handleCheckDone = e => {
    // Here we need to update the task in database and we set done when process finished with success
    setDone(e.target.checked)
  }

  return (
    <div className="todo-item-container">
      <div className='operations-container'>
        <input type="checkbox" className="mark-task-as-done-checkbox" checked={done ? 'checked' : ''} onChange={ handleCheckDone } />
        <button className='edit'></button>
        <button className='delete'></button>
      </div>
      <p className="content">{ item.content }</p>
    </div>
  )
}

export default Task