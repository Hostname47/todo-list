import React, { useRef, useState } from 'react'
import * as ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { switchCreateTaskModal } from '../features/modal/modalSlice';
import useInput from '../hooks/useInput';
import { switchMessageStatus } from '../features/message/messageSlice';

function CreateTaskModal() {
  const dispatch = useDispatch()
  const status = useSelector(state => state.modal.createTaskModalStatus)
  const createButtonRef = useRef(null)
  const [error, setError] = useState('')
  const [title, titleBind, resetTitle] = useInput('')
  const [notes, notesBind, resetNotes] = useInput('')
  
  const handleCreateTaskModalClose = () => {
    dispatch(switchCreateTaskModal({state: false}))
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

    request.onsuccess = function() {
      const db = request.result;
      const transaction = db.transaction("tasks", "readwrite");

      const store = transaction.objectStore("tasks");
      store.put({ title, notes, done: false });

      /**
       * After storing the task to indexedDB we need to:
       * 1. display a message to user about new task created
       * 2. refresh list in Todolist component
       * 3. close the create task modal
       */
      // fetchTasks()
      resetTitle()
      resetNotes()
      dispatch(switchMessageStatus({ status: true, type: 'success', message: 'Task has been created successfully' }))
      handleCreateTaskModalClose()

      transaction.oncomplete = () => {
        db.close()
      }
    }
  }

  console.log('--- Render Create Task Modal ---')
  return status && ReactDOM.createPortal((
    <div className='absolute-full-screen full-center modal-box'>
      <div className='absolute-full-screen modal-overlay'></div>
      <div className='relative modal-style-1-container'>
        <div className='title-box'>
          <div className='align-center g6'>
            <svg className="size14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M4.41,104.24c2.53-3,5.67-4,9.7-4,26.83.17,53.67,0,80.5.17,3.53,0,4.61-.67,4.58-4.44-.18-27-.1-54-.09-81,0-7.29,2-9.31,9.16-9.32q21.22,0,42.45,0c6.91,0,9,2.09,9,9,0,27,.09,54-.09,81,0,3.82.94,4.79,4.76,4.76,26.83-.17,53.67-.1,80.5-.09,7.58,0,9.5,1.92,9.51,9.47q0,21.23,0,42.45c0,6.55-2.17,8.66-8.83,8.67-27.16,0-54.32.09-81.47-.09-3.77,0-4.47,1-4.45,4.58.15,26.83,0,53.66.17,80.49,0,4-1,7.17-4,9.7H103c-3-2.53-4-5.67-4-9.7.16-26.85,0-53.7.18-80.55,0-3.65-.87-4.54-4.52-4.52-26.85.18-53.7,0-80.55.18-4,0-7.18-1-9.71-4Z"/></svg>
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
              <button className='move-to-right button-style-1 green' onClick={ handleCreateTask } ref={ createButtonRef }>
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