import { createSlice } from '@reduxjs/toolkit'
import { login } from '../services/auth'

const initialState = {
  loading: false,
  isAuthenticated: false,
  token: '',
  error: '',
}

export const authSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    userAuthenticated: (state, action) => {
      return {
        ...state,
        ...{
          loading: false,
          isAuthenticated: true,
          token: action.payload.token,
          error: '',
        },
      }
    },
    logout: (state) => {
      sessionStorage.clear()
      return {
        ...state,
        ...{
          loading: false,
          isAuthenticated: false,
          token: '',
          error: '',
        },
      }
    },
    tokenExpire: (state) => {
      sessionStorage.clear()
      return {
        ...state,
        ...{
          loading: false,
          isAuthenticated: false,
          token: '',
          error: '',
        },
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.token = action.payload.token
        sessionStorage.setItem('token', action.payload.token)
        state.error = ''
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.token = ''
        state.error = action.error.message
      })
  },
})

export const { userAuthenticated, logout, tokenExpire } = authSlice.actions

export default authSlice.reducer
