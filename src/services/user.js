import { createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/user`,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    authorization: 'Bearer ' + sessionStorage.getItem('token'),
  }
  return config
})

export const getInfo = createAsyncThunk('user/get_info', async () => {
  const response = await axiosInstance.get('/get_info')
  return response.data
})

export const editInfo = createAsyncThunk('user/edit_info', async (info) => {
  const response = await axiosInstance.put('/edit_info', info)
  return response.data
})
