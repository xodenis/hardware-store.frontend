import { createSlice } from '@reduxjs/toolkit'
import {
  getAllProducts,
  getProductsByCategory,
  getProductsBySubcategory,
} from '../services/products'

const initialState = {
  loading: false,
  products: [],
  error: '',
}

export const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.error = ''
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false
        state.products = []
        state.error = action.error.message
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.error = ''
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false
        state.products = []
        state.error = action.error.message
      })
      .addCase(getProductsBySubcategory.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductsBySubcategory.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.error = ''
      })
      .addCase(getProductsBySubcategory.rejected, (state, action) => {
        state.loading = false
        state.products = []
        state.error = action.error.message
      })
  },
})

export default productsSlice.reducer
