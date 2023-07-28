import { createSlice } from '@reduxjs/toolkit'

export const errorMessage = createSlice({
  name: 'errorMessage',
  initialState: {
    
    error: ''
  },
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    }
  }
})

export const { setErrorMessage } = errorMessage.actions;

export default errorMessage.reducer;
