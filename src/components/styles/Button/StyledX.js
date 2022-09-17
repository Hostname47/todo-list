import styled from "styled-components";

const StyledX = styled.button`
  display: flex;
  padding: 8px;
  border-radius: 50%;

  .x-icon {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background-color: ${ props => props.theme.x.hoverBG };
  }
`

export default StyledX