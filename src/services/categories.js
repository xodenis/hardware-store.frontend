import { setCategories } from '../app/categoriesSlice'
import * as axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/category`,
})

export const GetCategories = async (dispatch) => {
  try {
    // api call
    const { data } = await axiosInstance.get('/get_all_categories')
    dispatch(setCategories(data))
  } catch (error) {
    console.log(error)
  }
}
