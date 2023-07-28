import { createSlice } from '@reduxjs/toolkit'

export const Search = createSlice({
  name: 'search',
  initialState: {
   search:""
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  }
})

export const { setSearch } = Search.actions;

export default Search.reducer;
