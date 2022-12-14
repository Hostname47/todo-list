import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { switchMessageStatus } from '../features/message/messageSlice'

/**
 * Messages component wrapps the common messages like error message and success message
 * as well as regular message that is shown when an action completed with success or faulure
 */

function Messages() {
  const {status, type, message} = useSelector(state => state.message)
  const dispatch = useDispatch()
  const handleMessageClose = () => {
    dispatch(switchMessageStatus({ status: false }))
  }
  const sectionClass = `text-info-section ${type === 'success' ? 'success' : (type === 'error' ? 'error' : 'typical')}`

  console.log('--- Render Message Component ---')
  return status && ( 
    <div className={ sectionClass }>
      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M129,233.33h-108c-13.79,0-18.82-8.86-11.87-20.89q54-93.6,108.12-187.2c7.34-12.71,17.14-12.64,24.55.17,36,62.4,71.95,124.88,108.27,187.13,7.05,12.07-.9,21.28-12.37,21.06C201.43,232.88,165.21,233.33,129,233.33Zm91.36-24L129.4,51.8,38.5,209.3Zm-79-103.77c-.13-7.56-5.28-13-12-12.85s-11.77,5.58-11.82,13.1q-.13,20.58,0,41.18c.05,7.68,4.94,13,11.69,13.14,6.92.09,12-5.48,12.15-13.39.09-6.76,0-13.53,0-20.29C141.35,119.45,141.45,112.49,141.32,105.53Zm-.15,70.06a12.33,12.33,0,0,0-10.82-10.26,11.29,11.29,0,0,0-12,7.71,22.1,22.1,0,0,0,0,14A11.82,11.82,0,0,0,131.4,195c6.53-1.09,9.95-6.11,9.81-14.63A31.21,31.21,0,0,0,141.17,175.59Z"></path></svg>
      <span className='text'>{ message }</span>
      <button className='close' onClick={ handleMessageClose }>
        <svg className="x" viewBox="0 0 24 24"><path d="M20.46.73,12,9.18,3.54.73.72,3.54,9.18,12,.72,20.46l2.82,2.81L12,14.82l8.46,8.45,2.82-2.81L14.82,12l8.46-8.46Z"/></svg>
      </button>
    </div>
  )
}

export default Messages