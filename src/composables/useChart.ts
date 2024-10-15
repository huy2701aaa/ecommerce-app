import type { TError, TResult } from "@/common/type";
import { useChartsStore } from "@/stores/charts";
import { request } from "@/utils/request";
import { AxiosError } from "axios";
import { ElMessage } from "element-plus";

export const useChart = () => {
  const chartsStore = useChartsStore();

  const getCount = async () => {
    try {
      const response = await request.get(`/charts/count`);

      const { data } = response.data as TResult;

      chartsStore.setChartCount(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getUserStat = async () => {
    try {
      const response = await request.get(`/charts/user-stat`);

      const { data } = response.data as TResult;

      chartsStore.setChartUserStat(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getOrderStat = async () => {
    try {
      const response = await request.get(`/charts/order-stat`);

      const { data } = response.data as TResult;

      chartsStore.setChartOrderStat(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getRevenueStat = async () => {
    try {
      const response = await request.get(`/charts/revenue`);

      const { data } = response.data as TResult;

      chartsStore.setChartRevenue(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  return { getCount, getUserStat, getOrderStat, getRevenueStat };
};
