import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import cartSlice from './cartSlice'
import categoriesSlice from './categoriesSlice'
import favoritesSlice from './favoritesSlice'
import orderSlice from './orderSlice'
import productsSlice from './productsSlice'
import recommendationsSlice from './recommendationsSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    userSlice: userSlice,
    categoriesSlice: categoriesSlice,
    productsSlice: productsSlice,
    cartSlice: cartSlice,
    orderSlice: orderSlice,
    favoritesSlice: favoritesSlice,
    recommendationsSlice: recommendationsSlice,
  },
})
