import { createSlice } from '@reduxjs/toolkit'
import { getByProduct, getByUser } from '../services/recommendations'

const initialState = {
  loading: false,
  recommendations: [],
  error: '',
}

export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getByProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(getByProduct.fulfilled, (state, action) => {
        state.loading = false
        state.recommendations = action.payload
        state.error = ''
      })
      .addCase(getByProduct.rejected, (state, action) => {
        state.loading = false
        state.recommendations = {}
        state.error = action.error.message
      })

      .addCase(getByUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getByUser.fulfilled, (state, action) => {
        state.loading = false
        state.recommendations = action.payload
        state.error = ''
      })
      .addCase(getByUser.rejected, (state, action) => {
        state.loading = false
        state.recommendations = {}
        state.error = action.error.message
      })
  },
})

export default recommendationsSlice.reducer
