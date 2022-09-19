import styled from "styled-components";

const StyledLabel = styled.label`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  color: ${ props => props.theme.foregroundColor };
  margin-bottom: 4px;
`

export default StyledLabel