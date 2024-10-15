import type { TCategory, TError, TResult } from "@/common/type"
import { useCategoryStore } from "@/stores/category"
import { request } from "@/utils/request"
import { AxiosError } from "axios"
import { ElMessage } from "element-plus"

export const useCategory = () => {
  const categoryStore = useCategoryStore()

  const getSingleCategory = async (id: number) => {
    try {
      const response = await request.get(`/category/${id}`)

      const { data } = response.data as TResult

      categoryStore.setSingleCategory(data)

      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError

        return ElMessage.error(message)
      }

      ElMessage.error('Có lỗi xảy ra !')
    }
  }

  const getCategoryList = async () => {
    try {
      const response = await request.get('/category')

      const { data } = response.data as TResult

      categoryStore.setCategoryList(data)

      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError

        return ElMessage.error(message)
      }

      ElMessage.error('Có lỗi xảy ra !')
    }
  }

  const updateCategory = async (payload: TCategory, id: number) => {
    try {
      const response = await request.put(`/category/${id}`, payload)

      const { message } = response.data as TResult

      ElMessage.success(message)

      return true
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError

        return ElMessage.error(message)
      }

      ElMessage.error('Có lỗi xảy ra !')
    }
  }

  const deleteCategory = async (id: number) => {
    try {
      const response = await request.delete(`/category/${id}`)

      const { message } = response.data as TResult

      ElMessage.success(message)

      return true
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError

        return ElMessage.error(message)
      }

      ElMessage.error('Có lỗi xảy ra !')
    }
  }

  const createCategory = async (payload: TCategory) => {
    try {
      const response = await request.post('/category', payload)

      const { message } = response.data as TResult

      ElMessage.success(message)

      return true
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError

        return ElMessage.error(message)
      }

      ElMessage.error('Có lỗi xảy ra !')
    }
  }


  return { getSingleCategory, getCategoryList, updateCategory, createCategory, deleteCategory }
}