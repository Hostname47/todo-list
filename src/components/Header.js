import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { switchAboutModal, switchCreateTaskModal } from '../features/modal/modalSlice'
import ButtonStyled from './styles/Button/StyledButton.styled'
import StyledHeader from './styles/StyledHeader.styled'

function Header() {
  const dispatch = useDispatch()

  const handleAboutModalOpen = () => {
    dispatch(switchAboutModal({status: true}))
  }

  const handleCreateTaskModalOpen = () => {
    dispatch(switchCreateTaskModal({status: true}))
  }

  const heartRef = useRef()
  // Heart beating effect
  useEffect(() => {
    const heartBeating = setInterval(() => {
      if(heartRef.current.style.width === '16px') {
        heartRef.current.style.width = '19px'
        heartRef.current.style.width = '19px'
      } else {
        heartRef.current.style.width = '16px'
        heartRef.current.style.width = '16px'
      }
    }, 500)

    return () => {
      clearInterval(heartBeating)
    }
  }, [])
  const heartWrapper = { maxHeight: '19px', height: '19px', maxWidth: '19px', width: '19px', margin: '0 2px' }
  const heart = { width: '16px', stroke: '#331010', strokeWidth: '5px' }
  
  console.log('--- Render Header ---')
  return (
    <StyledHeader>
      <div className='align-center'>
        <svg id='logo-icon' fill='#1993ff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M433.73,49.92,178.23,305.37,78.91,206.08.82,284.17,178.23,461.56,511.82,128Z"/></svg>
        <div>
          <h1 id='logo-title'>Todo list</h1>
          <div className='dark'>
              <div className="align-center fs11" style={{ letterSpacing: '1.2px', gap: '2px' }}>
                  <p className="unselectable bold no-margin ml2">Designed with</p>
                  <div style={ heartWrapper } className="full-center" title="LOVE">
                      <svg ref={ heartRef } fill="#FF0000" style={ heart } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 94.5"><path d="M86.82,26.63v-7.3H78.64V12H62.27v7.29H54.09v7.3H45.91v-7.3H37.73V12H21.36v7.29H13.18v7.3H5V48.5h8.18v7.29h8.18v7.29h8.19v7.29h8.18v7.3h8.18V85h8.18V77.67h8.18v-7.3h8.18V63.08h8.19V55.79h8.18V48.5H95V26.63Z"/></svg>
                  </div>
                  <p className="unselectable bold no-margin">by<a href="https://mouad-nassri.netlify.app" rel="noreferrer" target="_blank" className="no-underline" style={{ color: '#1993ff', marginLeft: '4px' }}>Mouad</a></p>
              </div>
          </div>
        </div>
      </div>
      <ButtonStyled className='move-to-right' onClick={ handleAboutModalOpen }>
        <svg className="size14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M65.4,453.77h85.53V512l55-24.76L261,512V453.77H446.6V0H65.4ZM231,465.61l-25-11.27-25,11.27V423.74H231ZM155.44,30H416.6V333.7H155.44Zm-60,0h30.05V333.7h-30Zm0,333.7H416.6v60.07H261v-30H150.93v30H95.4ZM301,231.9V161.85H241v30h30V231.9H241v30h90.07v-30ZM271,101.8h30v30H271Z"/></svg>
        <span className='label'>read me</span>
      </ButtonStyled>
      <ButtonStyled className='ml6' onClick={ handleCreateTaskModalOpen }>
        <svg className="size8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path d="M4.41,104.24c2.53-3,5.67-4,9.7-4,26.83.17,53.67,0,80.5.17,3.53,0,4.61-.67,4.58-4.44-.18-27-.1-54-.09-81,0-7.29,2-9.31,9.16-9.32q21.22,0,42.45,0c6.91,0,9,2.09,9,9,0,27,.09,54-.09,81,0,3.82.94,4.79,4.76,4.76,26.83-.17,53.67-.1,80.5-.09,7.58,0,9.5,1.92,9.51,9.47q0,21.23,0,42.45c0,6.55-2.17,8.66-8.83,8.67-27.16,0-54.32.09-81.47-.09-3.77,0-4.47,1-4.45,4.58.15,26.83,0,53.66.17,80.49,0,4-1,7.17-4,9.7H103c-3-2.53-4-5.67-4-9.7.16-26.85,0-53.7.18-80.55,0-3.65-.87-4.54-4.52-4.52-26.85.18-53.7,0-80.55.18-4,0-7.18-1-9.71-4Z"/></svg>
        <span className='label'>create a task</span>
      </ButtonStyled>
    </StyledHeader>
  )
}

export default Header