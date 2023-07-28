import { createSlice } from '@reduxjs/toolkit'

export const isUserLoggedIn = createSlice({
  name: 'isUserLoggedIn',
  initialState: {
    
    isUserLoggedIn: false
  },
  reducers: {
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    }
  }
})

export const { setIsUserLoggedIn } = isUserLoggedIn.actions;

export default isUserLoggedIn.reducer;
