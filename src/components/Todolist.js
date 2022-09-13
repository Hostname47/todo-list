import React, { useEffect } from 'react'
import Task from './Task'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodolistTasks } from '../features/todolist/todolistSlice'

function Todolist() {
  const todolist = useSelector(state => state.todolist)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchTodolistTasks())
    }, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('--- Render Todolist ---')
  return (
    <div>
      {
        todolist.loading 
          ?
            <div className='full-center align-center g6' style={{ marginTop: '26px' }}>
              <svg className="spinner size14 rotate" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" vectorEffect="non-scaling-stroke"></circle><path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
              <span>fetching tasks..</span>
            </div>
          :
          todolist.error 
          ?
            <div className='text-info-section error'>
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M129,233.33h-108c-13.79,0-18.82-8.86-11.87-20.89q54-93.6,108.12-187.2c7.34-12.71,17.14-12.64,24.55.17,36,62.4,71.95,124.88,108.27,187.13,7.05,12.07-.9,21.28-12.37,21.06C201.43,232.88,165.21,233.33,129,233.33Zm91.36-24L129.4,51.8,38.5,209.3Zm-79-103.77c-.13-7.56-5.28-13-12-12.85s-11.77,5.58-11.82,13.1q-.13,20.58,0,41.18c.05,7.68,4.94,13,11.69,13.14,6.92.09,12-5.48,12.15-13.39.09-6.76,0-13.53,0-20.29C141.35,119.45,141.45,112.49,141.32,105.53Zm-.15,70.06a12.33,12.33,0,0,0-10.82-10.26,11.29,11.29,0,0,0-12,7.71,22.1,22.1,0,0,0,0,14A11.82,11.82,0,0,0,131.4,195c6.53-1.09,9.95-6.11,9.81-14.63A31.21,31.21,0,0,0,141.17,175.59Z"></path></svg>
              <span className='text'>{ todolist.error }</span>
            </div>
          :
            <div id='todo-items-box'>
              { todolist.tasks.length
                ? todolist.tasks.map(task => (
                    <Task key={ task.id } task={ task } />
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