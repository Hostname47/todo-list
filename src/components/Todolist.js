import React, { useEffect, useState } from 'react'
import Task from './Task'

function Todolist() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  /**
   * Fetch todo list from IndexedDB; but for now let's just pretend :)
   */
  useEffect(() => {
    // Set loading to false when data fetched or when an error occured while fetching
    setLoading(false)
    // Let's hard coding the list data
    setList([
      { id: 1, content: "I'm going to kick your ass next time you use class component", done: false },
      { id: 2, content: "I have to get a job by the end of 2022", done: false },
      { id: 3, content: "I should learn redux for state management even though lot of people hate it", done: false },
      { id: 4, content: "I have to train today", done: true },
    ]);
  }, [])

  return (
    <div>
      {
        loading 
          ?
            <div>
              loading..
            </div>
          : 
            <div id='todo-items-box'>
              { list.length
                ? list.map(item => (
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