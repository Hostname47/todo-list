import styled from "styled-components";

const SquareButton2 = styled.button`
  display: flex;
  border-radius: 50%;
  padding: 4px;
  transition: all 0.2s ease;
  fill: ${ props => props.theme.foregroundColor };

  &:hover {
    background-color: #697279;
  }
`

export default SquareButton2