import { createSlice } from '@reduxjs/toolkit'
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from '../services/favorites'
import { logout } from './authSlice'

const initialState = {
  loading: false,
  favorites: {},
  error: '',
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.loading = true
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.favorites = action.payload
        state.error = ''
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false
        state.favorites = {}
        state.error = action.error.message
      })

      .addCase(addToFavorites.pending, (state) => {
        state.loading = true
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.favorites = action.payload
        state.error = ''
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false
        state.favorites = {}
        state.error = action.error.message
      })

      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.favorites = action.payload
        state.error = ''
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false
        state.favorites = {}
        state.error = action.error.message
      })

      .addCase(logout(), (state) => {
        state.loading = false
        state.favorites = {}
        state.error = ''
      })
  },
})

export default favoritesSlice.reducer
