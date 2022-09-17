import React, { useEffect, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { switchEditTaskModal } from '../features/modal/modalSlice';
import { switchMessageStatus } from '../features/message/messageSlice';
import { refreshTodolistTasks } from '../features/todolist/todolistSlice';
import StyledButton from '../components/styles/Button/StyledButton.styled';
import TextButton from '../components/styles/Button/TextButton.styled';
import useModalEsc from '../hooks/useModalEsc';
import StyledModal from '../components/styles/StyledModal';
import StyledX from '../components/styles/Button/StyledX';

function EditTaskModal() {
  const updateButtonRef = useRef(null)
  const titleRef = useRef(null)
  const taskToEdit = useSelector(state => state.modal.taskToEdit)
  const editTaskModalStatus = useSelector(state => state.modal.editTaskModalStatus)
  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [title, titleBind, resetTitle] = useInput('')
  const [notes, notesBind, resetNotes] = useInput('')
  
  useEffect(() => {
    /**
     * The following condition is really useful to prevent the modal from rerendering when
     * the taskToEdit is changed during closing because without checking status, the component
     * will be rerendered after closing the modal and then the taskToEdit will be changed which
     * will caused setDone and title&notes reset to change the state
     */
    if(editTaskModalStatus) {
      setDone(taskToEdit.done)
      resetTitle(taskToEdit.title)
      resetNotes(taskToEdit.notes)
      titleRef.current.focus()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskToEdit]);

  useModalEsc(() => {
    dispatch(switchEditTaskModal({ status: false }))
  })
  
  const handleEditTaskModalClose = () => {
    dispatch(switchEditTaskModal({ status: false, task: null }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    if(title.trim() === '') {
      setError('Task title field is required')
      return;
    } else if(title.trim().length > 40) {
      setError('Task title is too long')
      return;
    } else if(notes.trim().length > 40) {
      setError('Task notes is too long')
      return;
    }

    setError('');

    const updateButton = updateButtonRef.current
    const spinner = updateButton.querySelector('.spinner')

    // Show spinner and disable the update button (those will be toggled when the store action finished)
    spinner.classList.remove('none')
    updateButton.disabled = true

    // // --- Update task informations (in IndexedDB) ---
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
      const taskRequest = store.get(taskToEdit.id)

      taskRequest.onsuccess = () => {
        const task = taskRequest.result
        task.title = title.trim()
        task.notes = notes.trim()
        task.done = done
        store.put(task)

        /**
         * After updating the task we need to:
         * 1. display a message to user task updates
         * 2. refresh list in Todolist component
         * 3. close the edit task modal
         */
        dispatch(switchMessageStatus({ status: true, type: 'success', message: 'Task has been updated successfully' }))
        dispatch(refreshTodolistTasks())
        handleEditTaskModalClose()
        // Hide spinner and enable the update button
        spinner.classList.add('none')
        updateButton.disabled = false

        transaction.oncomplete = () => {
          db.close()
        }
      }
    }
  }

  const handleRestore = e => {
    e.preventDefault()
    
    setError('')
    setDone(taskToEdit.done)
    resetTitle(taskToEdit.title)
    resetNotes(taskToEdit.notes)
  }

  console.log('--- Render Update Task Modal ---')
  return editTaskModalStatus && ReactDOM.createPortal((
    <StyledModal className='absolute-full-screen full-center modal-box'>
      <div className='absolute-full-screen modal-overlay'></div>
      <div className='relative modal-style-1-container'>
        <div className='title-box'>
          <div className='align-center'>
            <svg className="size16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M181,21c14,2.34,23.12,11.71,31.67,21.91,11.51,13.73,11.54,35.17.09,49.12a72.16,72.16,0,0,1-4.92,5.28c-28.77,28.9-57.72,57.62-86.22,86.79-7.39,7.56-15.52,12.24-25.89,13.84-10.17,1.57-20.22,3.93-30.33,6-16,3.21-29.39-9.93-26.3-26.14,2.44-12.8,4.87-25.62,8.06-38.24a29.24,29.24,0,0,1,7-12.79C85.08,95.19,116.36,64,147.42,32.57c6.12-6.18,13.65-9.28,21.71-11.56ZM60.2,183c13.35-2.22,25.88-4.24,38.37-6.48a9,9,0,0,0,4.14-2.67c6.56-6.47,13-13,19.49-19.58q36-36.36,72.08-72.75c8-8.14,8.18-17.45.52-25.6-1.94-2.07-4-4-6-6q-14.2-14.25-28.37,0Q116.26,94.29,72,138.7a17.35,17.35,0,0,0-5.23,9.8C64.84,159.78,62.52,171,60.2,183Zm151.36,56,1.9-.89c4.87-2.19,7.13-5.86,6.6-10.7s-4.09-8.37-9.21-9.13a37.33,37.33,0,0,0-5.5-.27H53.49a39,39,0,0,0-5.92.31c-7,1.05-11,8.1-7.6,14.35,1.4,2.61,4.61,4.25,7,6.33Z"/></svg>
            <h2 className='title ml6'>Edit task informations</h2>
          </div>

          <StyledX onClick={ handleEditTaskModalClose }>
            <svg className="x-icon" viewBox="0 0 24 24"><path d="M20.46.73,12,9.18,3.54.73.72,3.54,9.18,12,.72,20.46l2.82,2.81L12,14.82l8.46,8.45,2.82-2.81L14.82,12l8.46-8.46Z"/></svg>
          </StyledX>
        </div>
        <div className='content-box'>
          <form onSubmit={ handleSubmit }>
            { error && (
              <div className='text-info-section error'>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M129,233.33h-108c-13.79,0-18.82-8.86-11.87-20.89q54-93.6,108.12-187.2c7.34-12.71,17.14-12.64,24.55.17,36,62.4,71.95,124.88,108.27,187.13,7.05,12.07-.9,21.28-12.37,21.06C201.43,232.88,165.21,233.33,129,233.33Zm91.36-24L129.4,51.8,38.5,209.3Zm-79-103.77c-.13-7.56-5.28-13-12-12.85s-11.77,5.58-11.82,13.1q-.13,20.58,0,41.18c.05,7.68,4.94,13,11.69,13.14,6.92.09,12-5.48,12.15-13.39.09-6.76,0-13.53,0-20.29C141.35,119.45,141.45,112.49,141.32,105.53Zm-.15,70.06a12.33,12.33,0,0,0-10.82-10.26,11.29,11.29,0,0,0-12,7.71,22.1,22.1,0,0,0,0,14A11.82,11.82,0,0,0,131.4,195c6.53-1.09,9.95-6.11,9.81-14.63A31.21,31.21,0,0,0,141.17,175.59Z"></path></svg>
                <span className='text'>{ error }</span>
              </div>
            ) }
            <div className='mb8'>
              <label className='label-style-1' htmlFor='task-title'>What do you need to do ?</label>
              <input type="text" id='task-title' { ...titleBind } className='input-style-1' placeholder='Title of your task that you want to do' ref={ titleRef } />
            </div>
            <div className='mb8'>
              <label className='label-style-1' htmlFor='task-note'>Task notes</label>
              <textarea type="text" id='task-note' { ...notesBind } className='input-style-1' placeholder='Task notes'></textarea>
            </div>
            <label className='label-style-1 align-center g6' htmlFor='edit-task-title'>
              <span>Task done :</span>
              <input type='checkbox' id='edit-task-title' checked={ done ? 'checked' : '' } onChange={ e => setDone(e.target.checked) } />
            </label>
            <div className='align-center g8'>
              <StyledButton type="submit" className='move-to-right green' ref={ updateButtonRef }>
                <svg className="spinner size14 none rotate" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" vectorEffect="non-scaling-stroke"></circle><path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
                <span>Update task</span>
              </StyledButton>
              <StyledButton onClick={ handleRestore }>
                <svg className="spinner size14 none rotate" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" vectorEffect="non-scaling-stroke"></circle><path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
                <span>Restore task informations</span>
              </StyledButton>
              <TextButton onClick={ handleEditTaskModalClose }>cancel</TextButton>
            </div>
          </form>
        </div>
      </div>
    </StyledModal>
  ), document.getElementById('modal'));
}

export default EditTaskModal