import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: #eff5fb;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  border-bottom: 1px solid #CBDEF2;

  #logo-title {
    font-size: 18px;
    color: #1a94ff;
    margin: 0;
  }

  #logo-icon {
    width: 16px;
    height: 16px;
    padding: 9px 9px;
    background-color: #E2F1FF;
    border: 1px solid #3497EE;
    border-radius: 50%;
    margin-right: 8px;
  }
`

export default StyledHeader
