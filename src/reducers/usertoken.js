import { createSlice } from '@reduxjs/toolkit'

export const userToken = createSlice({
  name: 'userToken',
  initialState: {
    
    userToken: ''
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    }
  }
})

export const { setUserToken } = userToken.actions;

export default userToken.reducer;
