const todolistInitialState = {
  tasks: [],
  loading: true,
  error: '',
  refresh: false
}

const todolistReducer = (state, action) => {
  switch(action.type) {
    case 'refresh':
      // Just a workaround til I find a better way to refresh components
      return { ...state, refresh: !state.refresh }
    case 'setLoading':
      return { ...state, loading: action.loading }
    case 'fillTasks':
      return { ...state, tasks: action.tasks }
    default:
      return state
  }
}

export { todolistInitialState, todolistReducer }
