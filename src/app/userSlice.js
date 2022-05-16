import { createSlice } from '@reduxjs/toolkit'
import { editInfo, getInfo } from '../services/user'

const initialState = {
  loading: false,
  user: {},
  error: '',
}

export const userSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = ''
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.loading = false
        state.user = {}
        state.error = action.error.message
      })

      .addCase(editInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(editInfo.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = ''
      })
      .addCase(editInfo.rejected, (state, action) => {
        state.loading = false
        state.user = {}
        state.error = action.error.message
      })
  },
})

export default userSlice.reducer
