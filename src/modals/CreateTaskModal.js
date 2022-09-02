import React, { useContext } from 'react'
import * as ReactDOM from 'react-dom';
import { ModalsContext } from '../App';

function CreateTaskModal() {
  const modalsContext = useContext(ModalsContext)
  const handleCreateTaskModalClose = () => {
    modalsContext.dispatch({ type: 'createTaskSwitch', value: false })
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
          
        </div>
      </div>
    </div>
  ), document.getElementById('modal'));
}

export default CreateTaskModal