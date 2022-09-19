import styled from "styled-components";

export const StyledModal = styled.div`
  color: ${props => props.theme.foregroundColor};

  .title {
    margin: 0;
  }

  .title-box {
    background-color: ${props => props.theme.modal.header.backgroundColor};
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.modal.header.borderBottomColor};
    fill: ${props => props.theme.foregroundColor};
  }

  .content-box {
    padding: 14px;
    overflow-y: auto;
    max-height: 450px;
    background-color: ${props => props.theme.modal.content.backgroundColor};
  }

  .x {
    cursor: pointer;
    padding: 6px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
  .x:hover {
    background-color: #e8e8e8;
  }

  .modal-style-1-container {
    width: 600px;
    background-color: white;
    border-radius: 3px;
    margin-top: -26px;
    overflow: hidden;
  }
`

export default StyledModal
