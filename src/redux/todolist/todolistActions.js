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

export const fetchTodolist = () => {
  return dispatch => {
    // Dispatch fetch tasks request action
    dispatch(fetchTodolistRequest())

    const request = indexedDB.open('todos', 1)
    request.onerror = function (event) {
      // Dispatch failure action to show error
      dispatch(fetchTodolistFailure('Tasks fetching went wrong for some reason'))
    };
    request.onupgradeneeded = function () {
      const db = request.result;
      db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
    };
    request.onsuccess = function() {
      const db = request.result;
      const transaction = db.transaction("tasks", 'readonly');
      const store = transaction.objectStore("tasks");
      const dataRequest = store.getAll()

      dataRequest.onsuccess = () => {
        // Dispatch success action to fill tasks
        dispatch(fetchTodolistSuccess(dataRequest.result))
      }

      transaction.oncomplete = () => {
        db.close()
      }
    }
  }
}