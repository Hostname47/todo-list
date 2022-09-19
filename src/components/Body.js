import React from 'react'
import StyledBody from './styles/StyledBody.styled'

function Body({ children }) {
  return (
    <StyledBody>
      { children }
    </StyledBody>
  )
}

export default Body