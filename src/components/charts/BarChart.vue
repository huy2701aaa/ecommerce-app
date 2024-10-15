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
            data: props.series
        }],
        chartOptions: {
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function () { }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: props.labels,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            }
        },
    }
});
</script>

<template>
    <div id="chart">
        <apexchart type="bar" height="400px" :options="data.chartOptions" :series="data.series"></apexchart>
    </div>
</template>
