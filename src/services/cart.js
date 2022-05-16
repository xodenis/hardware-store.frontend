import { createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/cart`,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    authorization: 'Bearer ' + sessionStorage.getItem('token'),
  }
  return config
})

export const getCart = createAsyncThunk('cart/get', async () => {
  const response = await axiosInstance.get('/get')
  return response.data
})

export const addProduct = createAsyncThunk(
  'cart/addProduct',
  async ({ productId, count }) => {
    const response = await axiosInstance.post(
      `/add?productId=${productId}&count=${count}`,
    )
    return response.data
  },
)

export const removeProduct = createAsyncThunk(
  'cart/removeProduct',
  async (productId) => {
    const response = await axiosInstance.delete(
      `/remove?productId=${productId}`,
    )
    return response.data
  },
)

export const removeAllProducts = createAsyncThunk(
  'cart/removeAllProducts',
  async () => {
    const response = await axiosInstance.delete(`/remove_all`)
    return response.data
  },
)
