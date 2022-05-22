import { createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/recommendations`,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    authorization: 'Bearer ' + sessionStorage.getItem('token'),
  }
  return config
})

export const getByProduct = createAsyncThunk(
  'recommendations/getByProduct',
  async (productId) => {
    const response = await axiosInstance.get(
      `/get_by_product?productId=${productId}`,
    )
    return response.data
  },
)

export const getByUser = createAsyncThunk(
  'recommendations/getByUser',
  async () => {
    const response = await axiosInstance.get('/get_by_user')
    return response.data
  },
)
