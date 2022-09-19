import styled from "styled-components";

const StyledInput = styled.input`
  outline: none;
  display: flex;
  padding: 8px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid ${ props => props.theme.input.borderColor };
  background-color: ${ props => props.theme.input.backgroundColor };
  color: ${ props => props.theme.foregroundColor };

  &:focus {
    border-color: #1198ff;
    outline: 3px solid #1198ff40;
  }
  
  &[type=checkbox] {
    margin: 0;
  } 
`

export default StyledInput