import type { TError, TComment, TResult } from "@/common/type";
import { useCommentStore } from "@/stores/comment";
import { request } from "@/utils/request";
import { AxiosError } from "axios";
import { ElMessage } from "element-plus";

export const useComment = () => {
  const commentStore = useCommentStore();

  const getSingleComment = async (id: number) => {
    try {
      const response = await request.get(`/comment/${id}`);

      const { data } = response.data as TResult;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getComments = async (productId?: number) => {
    try {
      const response = await request.get("/comment", {
        params: {
          productId,
        },
      });

      const { data } = response.data as TResult;

      commentStore.setCommentList(data);
      
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;
        
        ElMessage.error(message);
        
        return false;
      }

      ElMessage.error("Có lỗi xảy ra !");

      return false;
    }
  };

  const updateComment = async (payload: TComment, id: number) => {
    try {
      const response = await request.put(`/comment/${id}`, payload);

      const { message } = response.data as TResult;

      ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const deleteComment = async (id: number) => {
    try {
      const response = await request.delete(`/comment/${id}`);

      const { message } = response.data as TResult;

      ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const createComment = async (payload: TComment) => {
    try {
      const response = await request.post("/comment", payload);

      const { message } = response.data as TResult;

      ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  return {
    getSingleComment,
    getComments,
    updateComment,
    deleteComment,
    createComment,
  };
};
