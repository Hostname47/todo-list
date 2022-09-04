import React, { useContext, useRef, useState } from 'react'
import { ModalsContext } from '../App'

function Task({ item, todolistDispatch }) {
  const modalsContext = useContext(ModalsContext)
  const [done, setDone] = useState(item.done)
  const [displayNotes, setDisplayNotes] = useState(false)

  const titleRef = useRef(null)
  const deleteContainerRef = useRef(null)

  const handleCheckDone = e => {
    // Here we need to update the task in database and we set done when process finished with success
    const doneValue = e.target.checked

    /**
     * First we need to check (or uncheck) done input to show the user the change,
     * then we need to update the task done property in database
     * then if the task marked as done we add a done class to task title to make it gray and add line-through style
     */
    setDone(doneValue)

    const request = indexedDB.open('todos', 1)
    request.onupgradeneeded = function () {
      const db = request.result;
      const store = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
      store.createIndex("done_tasks", ["done"], { unique: false });
    };
    request.onsuccess = function() {
      const db = request.result;
      const transaction = db.transaction("tasks", 'readwrite');

      const store = transaction.objectStore("tasks");
      const dataRequest = store.get(item.id)

      dataRequest.onsuccess = () => {
        const task = dataRequest.result
        task.done = doneValue
        store.put(task)

        if(doneValue)
          titleRef.current.classList.add('done')
        else
          titleRef.current.classList.remove('done')
      }

      transaction.oncomplete = () => {
        db.close()
      }
    }
  }

  const handleDisplayNotes = () => {
    setDisplayNotes(state => !state)
  }

  const handleDeleteContainer = (e, toggle) => {
    deleteContainerRef.current.style.marginLeft = toggle ? '0px' : '-159px';
  }

  /**
   * Delete the task from db and refresh the list
   */
  const handleDeleteTask = e => {
    const request = indexedDB.open('todos', 1)
    request.onupgradeneeded = function () {
      const db = request.result;
      const store = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
      store.createIndex("done_tasks", ["done"], { unique: false });
    };
    request.onsuccess = function() {
      const db = request.result;
      const transaction = db.transaction("tasks", 'readwrite');

      const store = transaction.objectStore("tasks");
      const dataRequest = store.delete(item.id)

      dataRequest.onsuccess = () => {
        todolistDispatch({ type: 'refresh' })
      }

      transaction.oncomplete = () => {
        db.close()
      }
    }
  }

  const handleEditTaskModalOpen = () => {
    modalsContext.dispatch({ type: 'editTaskSwitch', value: true, item: {...item, done} })
  }

  return (
    <div className="todo-item-container">
      <div className='delete-container' ref={ deleteContainerRef }>
        <span style={{ width: 'max-content', marginRight: '6px', paddingLeft: '8px' }}>Delete task?</span>
        <button className='flat-button-style red' onClick={ handleDeleteTask }>Yes</button>
        <button className='flat-button-style' onClick={ e => handleDeleteContainer(e, false) }>No</button>
      </div>
      <div className='operations-container'>
        <input type="checkbox" className="mark-task-as-done-checkbox" checked={done ? 'checked' : ''} onChange={ handleCheckDone } title='Mark task as done' />
        <button className='buttons-style-2' title='Edit' onClick={ handleEditTaskModalOpen }>
          <svg className="size16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M181,21c14,2.34,23.12,11.71,31.67,21.91,11.51,13.73,11.54,35.17.09,49.12a72.16,72.16,0,0,1-4.92,5.28c-28.77,28.9-57.72,57.62-86.22,86.79-7.39,7.56-15.52,12.24-25.89,13.84-10.17,1.57-20.22,3.93-30.33,6-16,3.21-29.39-9.93-26.3-26.14,2.44-12.8,4.87-25.62,8.06-38.24a29.24,29.24,0,0,1,7-12.79C85.08,95.19,116.36,64,147.42,32.57c6.12-6.18,13.65-9.28,21.71-11.56ZM60.2,183c13.35-2.22,25.88-4.24,38.37-6.48a9,9,0,0,0,4.14-2.67c6.56-6.47,13-13,19.49-19.58q36-36.36,72.08-72.75c8-8.14,8.18-17.45.52-25.6-1.94-2.07-4-4-6-6q-14.2-14.25-28.37,0Q116.26,94.29,72,138.7a17.35,17.35,0,0,0-5.23,9.8C64.84,159.78,62.52,171,60.2,183Zm151.36,56,1.9-.89c4.87-2.19,7.13-5.86,6.6-10.7s-4.09-8.37-9.21-9.13a37.33,37.33,0,0,0-5.5-.27H53.49a39,39,0,0,0-5.92.31c-7,1.05-11,8.1-7.6,14.35,1.4,2.61,4.61,4.25,7,6.33Z"/></svg>
        </button>
        <button className='buttons-style-2' title='Delete' onClick={ e => handleDeleteContainer(e, true) }>
          <svg className="size16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M207.61,146.85c0,16.84,0,33.68,0,50.51-.08,23.15-16,39.2-39.15,39.32q-38.44.21-76.91,0c-23.15-.12-39.09-16.21-39.13-39.32q-.09-51.88,0-103.76c0-1.06,0-2.13.08-3.18a9.29,9.29,0,0,1,9.21-8.85,9.49,9.49,0,0,1,9.89,8.18,33.31,33.31,0,0,1,.15,5q0,51,0,101.94c0,13.14,7.45,20.67,20.49,20.68h75.54c13,0,20.49-7.56,20.49-20.69q0-51,0-101.94a38.31,38.31,0,0,1,.09-4.55,9.5,9.5,0,0,1,9.95-8.62,9,9,0,0,1,9.16,8.85c.26,7.43.13,14.87.14,22.3Q207.63,129.79,207.61,146.85Zm-122-94.48c-11.22,0-22.45-.09-33.67.12a9.32,9.32,0,0,0-9.25,9.33,9.75,9.75,0,0,0,8.88,9.81,37.17,37.17,0,0,0,4.09.08H204.43c1.06,0,2.12,0,3.18,0,5.74-.33,9.87-4.55,9.75-9.91s-4.09-9.22-9.75-9.34c-8-.17-16.08-.06-24.12-.07H168.92c0-6.2.06-11.92,0-17.63-.1-7.91-3.58-11.46-11.39-11.48q-27.54-.09-55.07,0c-7.8,0-11.25,3.58-11.34,11.53-.07,5.59,0,11.19,0,17.58Zm25.28-9.5h38.24V52.1H110.84Zm9.35,68.8c0-6.59-4-10.83-9.67-10.8s-9.62,4.41-9.63,10.9q-.08,32.7,0,65.41c0,6.51,3.89,10.92,9.5,11,5.82.12,9.76-4.26,9.8-11.14.07-10.74,0-21.49,0-32.24C120.21,133.78,120.27,122.72,120.19,111.67Zm19.64,64.86a16.89,16.89,0,0,0,1,6.18A9.34,9.34,0,0,0,151.32,188c4.73-1,7.77-4.86,7.79-10.32q.07-33.15,0-66.3c0-6.18-4-10.45-9.54-10.54s-9.69,4.23-9.74,10.72c-.09,10.9,0,21.8,0,32.7C139.79,155,139.74,165.79,139.83,176.53Z"/></svg>
        </button>
        <button className='buttons-style-2' title='Task notes' onClick={ handleDisplayNotes }>
          <svg className="size14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448,0H64A64.08,64.08,0,0,0,0,64V448a64.08,64.08,0,0,0,64,64H448a64.07,64.07,0,0,0,64-64V64A64.08,64.08,0,0,0,448,0Zm21.33,448A21.35,21.35,0,0,1,448,469.33H64A21.34,21.34,0,0,1,42.67,448V64A21.36,21.36,0,0,1,64,42.67H448A21.36,21.36,0,0,1,469.33,64ZM147.63,119.89a22.19,22.19,0,0,0-4.48-7c-1.07-.85-2.14-1.7-3.2-2.56a16.41,16.41,0,0,0-3.84-1.92,13.77,13.77,0,0,0-3.84-1.28,20.49,20.49,0,0,0-12.38,1.28,24.8,24.8,0,0,0-7,4.48,22.19,22.19,0,0,0-4.48,7,20.19,20.19,0,0,0,0,16.22,22.19,22.19,0,0,0,4.48,7A22.44,22.44,0,0,0,128,149.33a32.71,32.71,0,0,0,4.27-.42,13.77,13.77,0,0,0,3.84-1.28,16.41,16.41,0,0,0,3.84-1.92c1.06-.86,2.13-1.71,3.2-2.56A22.44,22.44,0,0,0,149.33,128,21.38,21.38,0,0,0,147.63,119.89ZM384,106.67H213.33a21.33,21.33,0,0,0,0,42.66H384a21.33,21.33,0,0,0,0-42.66ZM148.91,251.73a13.77,13.77,0,0,0-1.28-3.84,16.41,16.41,0,0,0-1.92-3.84c-.86-1.06-1.71-2.13-2.56-3.2a24.8,24.8,0,0,0-7-4.48,21.38,21.38,0,0,0-16.22,0,24.8,24.8,0,0,0-7,4.48c-.85,1.07-1.7,2.14-2.56,3.2a16.41,16.41,0,0,0-1.92,3.84,13.77,13.77,0,0,0-1.28,3.84,32.71,32.71,0,0,0-.42,4.27A21.1,21.1,0,0,0,128,277.33,21.12,21.12,0,0,0,149.34,256,34.67,34.67,0,0,0,148.91,251.73ZM384,234.67H213.33a21.33,21.33,0,0,0,0,42.66H384a21.33,21.33,0,0,0,0-42.66ZM147.63,375.89a20.66,20.66,0,0,0-27.74-11.52,24.8,24.8,0,0,0-7,4.48,24.8,24.8,0,0,0-4.48,7,21.38,21.38,0,0,0-1.7,8.11,21.33,21.33,0,1,0,42.66,0A17.9,17.9,0,0,0,147.63,375.89ZM384,362.67H213.33a21.33,21.33,0,0,0,0,42.66H384a21.33,21.33,0,0,0,0-42.66Z"/></svg>
        </button>
      </div>
      <div className='content-box'>
        <p className={ `content ${ item.done && 'done' }` } ref={ titleRef }>{ item.title }</p>
        { displayNotes && (
          <div>
            { item.notes 
              ? <p className='notes'><strong className='dark'>Notes :</strong> { item.notes }</p>
              : <em className='notes not-set'><strong className='dark'>Notes :</strong> No notes available for this task.</em>
            }
          </div>
        ) }
      </div>
    </div>
  )
}

export default Task