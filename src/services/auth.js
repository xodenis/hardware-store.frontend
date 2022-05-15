import { createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/auth`,
})

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axiosInstance.post('/login', credentials)
  return response.data
})
