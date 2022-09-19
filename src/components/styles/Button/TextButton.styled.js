import styled from "styled-components";

const TextButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  color: ${ props => props.theme.button.textButton.color };
  border-radius: 3px;

  &:hover {
    color: ${ props => props.theme.button.textButton.hoverBG };
  }
`
export default TextButton
