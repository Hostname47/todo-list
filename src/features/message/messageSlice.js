import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  type: 'regular',
  message: '',
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    switchMessageStatus: (status, action) => {
      status.status = action.payload.status
      status.type = action.payload.type
      status.message = action.payload.message
    }
  }
})

export default messageSlice.reducer
export const { switchMessageStatus } = messageSlice.actions