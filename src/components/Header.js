import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { switchAboutModal, switchCreateTaskModal } from '../features/modal/modalSlice'
import SquareButton2 from './styles/Button/SquareButton2.styled'
import ButtonStyled from './styles/Button/StyledButton.styled'
import StyledHeader from './styles/StyledHeader.styled'
import { ThemeContext } from 'styled-components'

function Header(props) {
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)

  const handleAboutModalOpen = () => {
    dispatch(switchAboutModal({status: true}))
  }

  const handleCreateTaskModalOpen = () => {
    dispatch(switchCreateTaskModal({status: true}))
  }

  const toggleTheme = () => {
    props.toggleTheme()
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
          <div className="align-center fs11" style={{ letterSpacing: '1.2px', gap: '2px' }}>
              <p className="unselectable bold no-margin ml2">Designed with</p>
              <div style={ heartWrapper } className="full-center" title="LOVE">
                  <svg ref={ heartRef } fill="#FF0000" style={ heart } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 94.5"><path d="M86.82,26.63v-7.3H78.64V12H62.27v7.29H54.09v7.3H45.91v-7.3H37.73V12H21.36v7.29H13.18v7.3H5V48.5h8.18v7.29h8.18v7.29h8.19v7.29h8.18v7.3h8.18V85h8.18V77.67h8.18v-7.3h8.18V63.08h8.19V55.79h8.18V48.5H95V26.63Z"/></svg>
              </div>
              <p className="unselectable bold no-margin">by<a href="https://mouad-nassri.netlify.app" rel="noreferrer" target="_blank" className="no-underline" style={{ color: '#1993ff', marginLeft: '4px' }}>Mouad</a></p>
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
      <SquareButton2 className='ml8' onClick={ toggleTheme }>
        <svg className={ theme.name === 'dark' ? 'invisible none' : null } viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg>
        <svg className={ theme.name === 'light' ? 'invisible none' : null } viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg>
      </SquareButton2>
    </StyledHeader>
  )
}

export default Header