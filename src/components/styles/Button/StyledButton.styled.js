import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid #adb9bf;
  color: rgb(20, 20, 20);
  fill: rgb(20, 20, 20);
  border-radius: 3px;
  &:hover {
    background-color: #f2f4f7;
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
