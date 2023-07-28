import { createSlice } from '@reduxjs/toolkit'

export const Videos = createSlice({
  name: 'videos',
  initialState: {
    loading: true,
    videos: []
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  }
})

export const { setVideos, setLoading } = Videos.actions;

export default Videos.reducer;
