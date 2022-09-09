import { FETCH_TODOLIST_REQUEST, FETCH_TODOLIST_SUCCESS, FETCH_TODOLIST_FAILURE } from "./todolistActionTypes";

export const fetchTodolistRequest = () => {
  return {
    type: FETCH_TODOLIST_REQUEST
  }
}

export const fetchTodolistSuccess = tasks => {
  return {
    type: FETCH_TODOLIST_SUCCESS,
    payload: tasks
  }
}

export const fetchTodolistFailure = error => {
  return {
    type: FETCH_TODOLIST_FAILURE,
    payload: error
  }
}
