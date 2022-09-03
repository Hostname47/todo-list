import React, { useContext, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom';
import { ModalsContext, TodolistContext } from '../App';
import { MessagesContext } from '../App';
import useInput from '../hooks/useInput';

function CreateTaskModal({ todolistDispatch }) {
  // Consum Modals Context provided from the root App component to control all the modals switches
  const modalsContext = useContext(ModalsContext)
  const messagesContext = useContext(MessagesContext)
  const todolistContext = useContext(TodolistContext)

  const createButtonRef = useRef(null)
  // State (useInput is a custom hook)
  const [error, setError] = useState('')
  const [title, titleBind,] = useInput('')
  const [notes, notesBind,] = useInput('')
  
  const handleCreateTaskModalClose = () => {
    modalsContext.dispatch({ type: 'createTaskSwitch', value: false })
  }
  const handleCreateTask = e => {
    e.preventDefault()

    if(title === '') {
      setError('Task title field is required')
      return;
    } else if(title.length > 40) {
      setError('Task title is too long')
      return;
    } else if(notes.length > 40) {
      setError('Task notes is too long')
      return;
    }

    setError('');

    const createButton = createButtonRef.current
    const spinner = createButton.querySelector('.spinner')

    // Show spinner and disable the create button (those will be toggled when the store action finished)
    spinner.classList.remove('none')
    createButton.disabled = true

    // --- Store task (in IndexedDB) ---
    const request = indexedDB.open('todos', 1)

    request.onerror = function (event) {
      setError('Oops something went wrong ! please try again or refresh your browser')
    };    

    request.onupgradeneeded = function () {
      const db = request.result;
      const store = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
      store.createIndex("done_tasks", ["done"], { unique: false });
    };

    request.onsuccess = function() {
      const db = request.result;
      const transaction = db.transaction("tasks", "readwrite");

      const store = transaction.objectStore("tasks");
      store.put({ title, notes });

      /**
       * After storing the task to indexedDB we need to:
       * 1. display a message to user about new task created
       * 2. refresh list in Todolist component
       * 3. close the create task modal
       */
      messagesContext.dispatch({ type: 'success', value: 'Task has been created successfully' })
      todolistDispatch({ type: 'refresh' })
      modalsContext.dispatch({ type: 'createTaskSwitch', value: false })
    }
  }

  return ReactDOM.createPortal((
    <div className='absolute-full-screen full-center modal-box'>
      <div className='absolute-full-screen modal-overlay'></div>
      <div className='relative modal-style-1-container'>
        <div className='title-box'>
          <div className='align-center'>
            <h2 className='title'>Add a new task</h2>
          </div>

          <button className='flex' onClick={ handleCreateTaskModalClose }>
            <svg className="x" viewBox="0 0 24 24"><path d="M20.46.73,12,9.18,3.54.73.72,3.54,9.18,12,.72,20.46l2.82,2.81L12,14.82l8.46,8.45,2.82-2.81L14.82,12l8.46-8.46Z"/></svg>
          </button>
        </div>
        <div className='content-box'>
          <form>
            { error && (
              <div className='text-info-section error'>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M129,233.33h-108c-13.79,0-18.82-8.86-11.87-20.89q54-93.6,108.12-187.2c7.34-12.71,17.14-12.64,24.55.17,36,62.4,71.95,124.88,108.27,187.13,7.05,12.07-.9,21.28-12.37,21.06C201.43,232.88,165.21,233.33,129,233.33Zm91.36-24L129.4,51.8,38.5,209.3Zm-79-103.77c-.13-7.56-5.28-13-12-12.85s-11.77,5.58-11.82,13.1q-.13,20.58,0,41.18c.05,7.68,4.94,13,11.69,13.14,6.92.09,12-5.48,12.15-13.39.09-6.76,0-13.53,0-20.29C141.35,119.45,141.45,112.49,141.32,105.53Zm-.15,70.06a12.33,12.33,0,0,0-10.82-10.26,11.29,11.29,0,0,0-12,7.71,22.1,22.1,0,0,0,0,14A11.82,11.82,0,0,0,131.4,195c6.53-1.09,9.95-6.11,9.81-14.63A31.21,31.21,0,0,0,141.17,175.59Z"></path></svg>
                <span className='text'>{ error }</span>
              </div>
            ) }
            <div className='mb8'>
              <label className='label-style-1' htmlFor='task-title'>What do you need to do ?</label>
              <input type="text" id='task-title' { ...titleBind } className='input-style-1' placeholder='Title of your task that you want to do' />
            </div>
            <div className='mb8'>
              <label className='label-style-1' htmlFor='task-note'>Task notes</label>
              <textarea type="text" id='task-note' { ...notesBind } className='input-style-1' placeholder='Task notes'></textarea>
            </div>
            <div className='align-center g8'>
              <button className='move-to-right button-style-1' onClick={ handleCreateTask } ref={ createButtonRef }>
                <svg className="spinner size14 none rotate" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" vectorEffect="non-scaling-stroke"></circle><path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
                <span>Create task</span>
              </button>
              <button onClick={ handleCreateTaskModalClose }>cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ), document.getElementById('modal'));
}

export default CreateTaskModal