import { createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/orders`,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    authorization: 'Bearer ' + sessionStorage.getItem('token'),
  }
  return config
})

export const getOrders = createAsyncThunk('order/get', async () => {
  const response = await axiosInstance.get('/get')
  return response.data
})

export const addOrder = createAsyncThunk('order/add', async (products) => {
  const response = await axiosInstance.post('/add', products)
  return response.data
})
