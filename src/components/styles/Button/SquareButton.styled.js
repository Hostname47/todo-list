import styled from "styled-components";

/** maybe use interpolation to change button appearence based on viewport (using theming) */
const SquareButton = styled.button`
  display: flex;
  border-radius: 50%;
  padding: 4px;

  &:hover {
    background-color: #e2e6ec;
  }
`
export default SquareButton
