import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import cartSlice from './cartSlice'

import categoriesSlice from './categoriesSlice'
import productsSlice from './productsSlice'

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    categoriesSlice: categoriesSlice,
    productsSlice: productsSlice,
    cartSlice: cartSlice,
  },
})
