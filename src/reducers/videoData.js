import { createSlice } from '@reduxjs/toolkit'

export const VideoData = createSlice({
  name: 'videoData',
  initialState: {
   videoData:null,
   showMore:false
  },
  reducers: {
    setVideoData: (state, action) => {
      state.videoData = action.payload;
    },
    setShowMore: (state, action) => {
        state.showMore = action.payload;
      }
  }
})

export const { setVideoData,setShowMore } = VideoData.actions;

export default VideoData.reducer;
