import { createSlice } from '@reduxjs/toolkit'
import { addOrder, getOrders } from '../services/order'

import { logout } from './authSlice'

const initialState = {
  loading: false,
  orders: [],
  error: '',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
        state.error = ''
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false
        state.orders = []
        state.error = action.error.message
      })

      .addCase(addOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = [...state.orders, action.payload]
        state.error = ''
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false
        state.orders = []
        state.error = action.error.message
      })

      .addCase(logout(), (state) => {
        state.loading = false
        state.orders = []
        state.error = ''
      })
  },
})

export default cartSlice.reducer
