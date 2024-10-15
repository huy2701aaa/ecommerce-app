<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  labels?: string[];
  series?: number[];
  type?: string;
  title?: string;
}>();

const data = computed(() => {
  return {
    options: {
      labels: props.labels,
      title: {
        text: props.title,
        align: "left",
      },
    },
    series: props.series,
  };
});
</script>

<template>
  <div>
    <apexchart
      width="300px"
      :type="type"
      :options="data.options"
      :series="data.series"
    ></apexchart>
  </div>
</template>
