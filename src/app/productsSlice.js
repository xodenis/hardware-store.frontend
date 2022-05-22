import { createSlice } from '@reduxjs/toolkit'
import {
  getAllProducts,
  getById,
  getProductsByCategory,
  getProductsBySubcategory,
} from '../services/products'

const initialState = {
  loading: false,
  products: [],
  product: {},
  maxProductsPrice: 0,
  error: '',
}

export const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getById.pending, (state) => {
        state.loading = true
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
        state.error = ''
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false
        state.product = {}
        state.error = action.error.message
      })

      .addCase(getAllProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.maxProductsPrice = action.payload.reduce(
          (acc, curr) => (acc.price > curr.price ? acc.price : curr.price),
          0,
        )
        state.error = ''
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false
        state.products = []
        state.maxProductsPrice = 0
        state.error = action.error.message
      })

      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.maxProductsPrice = action.payload.reduce(
          (acc, curr) => (acc.price > curr.price ? acc.price : curr.price),
          0,
        )
        state.error = ''
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false
        state.products = []
        state.maxProductsPrice = 0
        state.error = action.error.message
      })

      .addCase(getProductsBySubcategory.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductsBySubcategory.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.maxProductsPrice = action.payload.reduce(
          (acc, curr) => (acc.price > curr.price ? acc.price : curr.price),
          0,
        )
        state.error = ''
      })
      .addCase(getProductsBySubcategory.rejected, (state, action) => {
        state.loading = false
        state.products = []
        state.maxProductsPrice = 0
        state.error = action.error.message
      })
  },
})

export default productsSlice.reducer
