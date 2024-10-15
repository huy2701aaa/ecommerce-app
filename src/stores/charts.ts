import { ref } from "vue";
import { defineStore } from "pinia";
import type { TChart } from "@/common/type";

export const useChartsStore = defineStore("chartsStore", () => {
  const chartCount = ref<TChart>({});
  const chartUserStat = ref<TChart>({});
  const chartOrderStat = ref<TChart>({});
  const chartRevenue = ref<TChart>({});

  const setChartCount = (payload: TChart) => {
    chartCount.value = payload;
  };

  const setChartUserStat = (payload: TChart) => {
    chartUserStat.value = payload;
  };

  const setChartOrderStat = (payload: TChart) => {
    chartOrderStat.value = payload;
  };

  const setChartRevenue = (payload: TChart) => {
    chartRevenue.value = payload
  }

  return {
    chartCount,
    setChartCount,
    chartUserStat,
    setChartUserStat,
    chartOrderStat,
    setChartOrderStat,
    chartRevenue,
    setChartRevenue
  };
});
