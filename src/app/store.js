import { configureStore } from '@reduxjs/toolkit'

import categoriesSlice from './categoriesSlice'
import productsSlice from './productsSlice'

export const store = configureStore({
  reducer: {
    categoriesSlice: categoriesSlice,
    productsSlice: productsSlice,
  },
})
