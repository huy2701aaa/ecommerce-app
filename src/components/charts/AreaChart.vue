<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    labels?: string[];
    series?: number[];
    title?: string;
}>();

const data = computed(() => {
    return {

        series: [{
            name: "Doanh thu",
            data: props.series
        }],
        chartOptions: {
            chart: {
                type: 'area',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: props.title,
                align: 'left'
            },
            labels: props.labels,
            xaxis: {
                enabled: false
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            }
        }
    }
});
</script>

<template>
    <div id="chart">
        <apexchart type="area" height="170" :options="data.chartOptions" :series="data.series"></apexchart>
    </div>
</template>
