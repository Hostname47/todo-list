import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid ${ props => props.theme.styledbutton.borderColor };
  color: ${ props => props.theme.foregroundColor };
  fill: ${ props => props.theme.foregroundColor };
  border-radius: 3px;
  &:hover {
    background-color: ${ props => props.theme.styledbutton.hoverBG };
  }
  &:disabled,
  &[disabled] {
    cursor: default !important;
    background-color: #f7f7f7 !important;
  }
  &.green {
    background-color: #dff9dd;
    border-color: #a8d0a4;
    color: #274025;
    fill: #274025;
  }
  &.green:hover {
    background-color: #d1eccf;
  }

  .icon {
    width: 14px;
    height: 14px;
  }
`
export default StyledButton
