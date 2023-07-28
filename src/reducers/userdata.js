import { createSlice } from '@reduxjs/toolkit'

export const UserData = createSlice({
  name: 'userData',
  initialState: {
   userData:""
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    }
  }
})

export const { setUserData } = UserData.actions;

export default UserData.reducer;
