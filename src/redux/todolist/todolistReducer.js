import { FETCH_TODOLIST_REQUEST, FETCH_TODOLIST_SUCCESS, FETCH_TODOLIST_FAILURE } from "./todolistActionTypes"

const initialState = {
  loading: true,
  tasks: [],
  error: ''
}

const todolistReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_TODOLIST_REQUEST:
      return { ...state, loading: true }
    case FETCH_TODOLIST_SUCCESS:
      return { ...state, loading: false, tasks: action.payload, error: '' }
    case FETCH_TODOLIST_FAILURE:
      return { ...state, loading: false, tasks: [], error: action.payload }
    default: return state
  }
}

export default todolistReducer