import { createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/favorites`,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    authorization: 'Bearer ' + sessionStorage.getItem('token'),
  }
  return config
})

export const getFavorites = createAsyncThunk('favorites/get', async () => {
  const response = await axiosInstance.get('/get')
  return response.data
})

export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async (productId) => {
    const response = await axiosInstance.post(`/add?productId=${productId}`)
    return response.data
  },
)

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async (productId) => {
    const response = await axiosInstance.delete(
      `/remove?productId=${productId}`,
    )
    return response.data
  },
)
