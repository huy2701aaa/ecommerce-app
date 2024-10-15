import type { TError, TOrder, TOrderDetails, TParamsOrder, TResult, TStatus } from "@/common/type";
import { useOrderStore } from "@/stores/order";
import { request } from "@/utils/request";
import { AxiosError } from "axios";
import { ElMessage } from "element-plus";

export const useOrder = () => {
  const orderStore = useOrderStore();

  const getSingleOrder = async (id: number) => {
    try {
      const response = await request.get(`/order/${id}`);

      const { data } = response.data as TResult;

      orderStore.setSingleOrder(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getOrders = async (params?: TParamsOrder) => {
    try {
      const response = await request.get("/order", {
        params
      });

      const { data } = response.data as TResult;

      orderStore.setOrderList(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getOrderByUser = async () => {
    try {
      const response = await request.get("/order/by-user");

      const { data } = response.data as TResult;

      orderStore.setOrderList(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const updateOrder = async (payload: TStatus, id: number) => {
    try {
      const response = await request.put(`/order/${id}`, payload);

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

  const deleteOrder = async (id: number) => {
    try {
      const response = await request.delete(`/order/${id}`);

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

  const createOrder = async (payload: TOrder) => {
    try {
      const response = await request.post("/order", payload);

      const { message, data } = response.data as TResult;

      ElMessage.success(message);

      return data as number;
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

  const createOrderDetails = async (
    payload: TOrderDetails,
    isShowMsg = true
  ) => {
    try {
      const response = await request.post("/order-details", payload);

      const { message, data } = response.data as TResult;

      if (isShowMsg) ElMessage.success(message);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  return {
    getSingleOrder,
    getOrders,
    updateOrder,
    createOrder,
    deleteOrder,
    createOrderDetails,
    getOrderByUser,
  };
};
