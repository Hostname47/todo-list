import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  border-bottom: 1px solid ${props => props.theme.headerBorderBottomColor};
  transition: all 0.2s ease;

  #logo-title {
    white-space: nowrap;
    overflow: hidden;
    font-size: 18px;
    color: #1a94ff;
    margin: 0;
  }

  #logo-icon {
    width: 13px;
    min-width: 13px;
    height: 13px;
    padding: 4px 4px;
    border: 3px solid #3497EE;
    border-radius: 50%;
    margin-right: 6px;
  }

  .primary-menu {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: 16px;
  }

  .primary-menu a {
    color: ${ props => props.theme.foregroundColor };
    text-decoration: none;
  }

  .primary-menu a.active {
    font-weight: bold;
  }
`

export default StyledHeader
