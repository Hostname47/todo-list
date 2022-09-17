import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  border-bottom: 1px solid ${props => props.theme.headerBorderBottomColor};
  transition: all 0.2s ease;

  #logo-title {
    font-size: 18px;
    color: #1a94ff;
    margin: 0;
  }

  #logo-icon {
    width: 16px;
    height: 16px;
    padding: 9px 9px;
    border: 1px solid #3497EE;
    border-radius: 50%;
    margin-right: 8px;
  }
`

export default StyledHeader
