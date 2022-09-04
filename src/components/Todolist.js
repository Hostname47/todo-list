import React, { useContext, useEffect } from 'react'
import Task from './Task'
import { MessagesContext, TodolistContext } from '../App'

function Todolist() {
  const messagesContext = useContext(MessagesContext)
  const todolistContext = useContext(TodolistContext)
  const state = todolistContext.state
  /**
   * Fetch todo list from IndexedDB; but for now let's just pretend :)
   */
  useEffect(() => {
    // Set loading to false when data fetched or when an error occured while fetching
    todolistContext.dispatch({ type: 'setLoading', loading: false })

    const request = indexedDB.open('todos', 1)

    request.onerror = function (event) {
      messagesContext.dispatch({ type: 'error', value: 'Tasks fetching went wrong for some reason' })
    };

    request.onupgradeneeded = function () {
      const db = request.result;
      const store = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
      store.createIndex("done_tasks", ["done"], { unique: false });
    };

    request.onsuccess = function() {
      const db = request.result;
      const transaction = db.transaction("tasks", 'readonly');

      const store = transaction.objectStore("tasks");
      const dataRequest = store.getAll()

      dataRequest.onsuccess = () => {
        todolistContext.dispatch({ type: 'fillTasks', tasks: dataRequest.result })
      }

      transaction.oncomplete = () => {
        db.close()
      }
    }
  }, [state.refresh])

  
  return (
    <div>
      {
        state.loading
          ?
            <div className='full-center align-center g6 my8'>
              <svg className="spinner size14 rotate" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" vectorEffect="non-scaling-stroke"></circle><path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
              <span>fetching tasks..</span>
            </div>
          : 
            <div id='todo-items-box'>
              { state.tasks.length
                ? state.tasks.map(item => (
                    <Task key={ item.id } item={ item } todolistDispatch={ todolistContext.dispatch } />
                  )
                )
                : (
                  <div className='full-center g6'>
                    <svg className="size16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256,0C114.5,0,0,114.51,0,256S114.51,512,256,512,512,397.49,512,256,397.49,0,256,0Zm0,472A216,216,0,1,1,472,256,215.88,215.88,0,0,1,256,472Zm0-257.67a20,20,0,0,0-20,20V363.12a20,20,0,0,0,40,0V234.33A20,20,0,0,0,256,214.33Zm0-78.49a27,27,0,1,1-27,27A27,27,0,0,1,256,135.84Z"/></svg>
                    <p className='fs13'>You don't have any saved task at the moment, click on create task button to start</p>
                  </div>
                )
              }
            </div>
      }

    </div>
  )
}

export default Todolist