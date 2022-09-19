import styled from "styled-components";

/** maybe use interpolation to change button appearence based on viewport (using theming) */
const SquareButton = styled.button`
  display: flex;
  border-radius: 50%;
  padding: 4px;
  fill: ${props => props.theme.squaredbutton.fill};

  &:hover {
    background-color: ${props => props.theme.squaredbutton.hoverBG};
  }
`
export default SquareButton
