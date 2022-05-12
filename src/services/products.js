import { createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/products`,
})

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async () => {
    const response = await axiosInstance.get('/get_all')
    return response.data
  },
)

export const getProductsByCategory = createAsyncThunk(
  'products/getByCategory',
  async (categoryId) => {
    const response = await axiosInstance.get(
      `/get_by_category?categoryId=${categoryId}`,
    )
    return response.data
  },
)

export const getProductsBySubcategory = createAsyncThunk(
  'products/getBySubcategory',
  async (subcategoryId) => {
    const response = await axiosInstance.get(
      `/get_by_subcategory?subcategoryId=${subcategoryId}`,
    )
    return response.data
  },
)
