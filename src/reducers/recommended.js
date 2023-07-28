import { createSlice } from '@reduxjs/toolkit'

export const Videos = createSlice({
  name: 'videos',
  initialState: {
    
    videos: []
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    }
  }
})

export const { setVideos } = Videos.actions;

export default Videos.reducer;
