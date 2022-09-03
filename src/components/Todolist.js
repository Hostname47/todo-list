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
                    <Task key={ item.id } item={ item } />
                  )
                )
                : <p>There's no tasks to be done</p>
              }
            </div>
      }

    </div>
  )
}

export default Todolist