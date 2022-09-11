import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  tasks: [],
  error: ''
}

export const fetchTodolist = createAsyncThunk('user/fetchUsers', () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('todos', 1)
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
        resolve(dataRequest.result)
      }
      dataRequest.onerror = () => {
        reject('Error occured while fetching users from database')
      }
  
      transaction.oncomplete = () => {
        db.close()
      }
    }
  })
})

const todolistSlice = createSlice({
  name: 'todolist',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchTodolist.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchTodolist.fulfilled, (state, action) => {
      state.loading = false
      state.tasks = action.payload
      state.error = ''
    })
    builder.addCase(fetchTodolist.rejected, (state, action) => {
      state.loading = false
      state.tasks = []
      state.error = action.error.message
    })
  }
})

export default todolistSlice.reducer
export const { switchAboutModal, switchCreateTaskModal } = todolistSlice.actions