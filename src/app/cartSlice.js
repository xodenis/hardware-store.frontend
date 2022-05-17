import { createSlice } from '@reduxjs/toolkit'
import {
  addProduct,
  changeCount,
  getCart,
  removeAllProducts,
  removeProduct,
} from '../services/cart'
import { logout } from './authSlice'

const initialState = {
  loading: false,
  cart: {},
  error: '',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.error = ''
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false
        state.cart = {}
        state.error = action.error.message
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.error = ''
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false
        state.cart = {}
        state.error = action.error.message
      })

      .addCase(removeProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.error = ''
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false
        state.cart = {}
        state.error = action.error.message
      })

      .addCase(removeAllProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(removeAllProducts.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.error = ''
      })
      .addCase(removeAllProducts.rejected, (state, action) => {
        state.loading = false
        state.cart = {}
        state.error = action.error.message
      })

      .addCase(changeCount.pending, (state) => {
        state.loading = true
      })
      .addCase(changeCount.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.error = ''
      })
      .addCase(changeCount.rejected, (state, action) => {
        state.loading = false
        state.cart = {}
        state.error = action.error.message
      })

      .addCase(logout(), (state) => {
        state.loading = false
        state.cart = {}
        state.error = ''
      })
  },
})

export default cartSlice.reducer
