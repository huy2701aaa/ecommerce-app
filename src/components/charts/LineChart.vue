<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  labels?: string[];
  series?: number[];
  title?: string;
}>();

const data = computed(() => {
  return {
    series: [
      {
        name: "Đơn hàng",
        data: props.series,
      },
    ],
    chartOptions: {
      chart: {
        height: 170,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: props.title,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: props.labels,
      },
    },
  };
});
</script>

<template>
  <div id="chart">
    <apexchart
      type="line"
      height="170"
      :options="data.chartOptions"
      :series="data.series"
    ></apexchart>
  </div>
</template>
