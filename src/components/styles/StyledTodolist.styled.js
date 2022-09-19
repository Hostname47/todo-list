import styled from "styled-components";

const StyledTodoList = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin: 16px auto;
  background-color: ${props => props.theme.todolist.backgroundColor};
  border: 1px solid ${props => props.theme.todolist.borderColor};
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 380px;
  box-sizing: border-box;

  .todo-item-container {
    position: relative;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid ${props => props.theme.todolist.borderColor};
    width: 100%;
  }
  .todo-item-container:last-child {
    border-bottom: unset;
  }

  .todo-item-container .delete-container {
    display: flex;
    align-items: center;
    font-size: 11px;
    background-color: #464e59;
    color: white;
    margin-left: -159px;
    transition: margin-left 0.2s ease;
  }

  .todo-item-container .content-box {
    border-left: 1px solid ${props => props.theme.todolist.borderColor};
    padding: 8px;
  }

  .todo-item-container .content {
    margin: 0;
    line-height: 1.4;
    /* text-overflow: ellipsis; */
    /* overflow: hidden; */
    /* width: 300px; */
    /* height: 1.2em;  */
    /* white-space: nowrap; */
    transition: all 0.4s ease;
    font-weight: bold;
  }

  .todo-item-container .content.done {
    text-decoration: line-through;
    color: ${props => props.theme.todolist.taskDoneColor};
  }

  .todo-item-container .notes {
    margin: 8px 0;
    font-size: 13px;
  }
  .todo-item-container .notes.not-set {
    font-size: 12px;
    color: rgb(70, 70, 70);
  }

  .todo-item-container .mark-task-as-done-checkbox {
    width: 15px;
    height: 15px;
    margin: 0 4px;
  }

  .todo-item-container .operations-container {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 4px 10px;
  }

`

export default StyledTodoList