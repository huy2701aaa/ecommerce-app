<script lang="ts" setup>
import BaseTable from "@/base/BaseTable.vue";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useUser } from "@/composables/useUser";
import PieChart from "@/components/charts/PieChart.vue";
import { useChart } from "@/composables/useChart";
import { useChartsStore } from "@/stores/charts";
import LineChart from "@/components/charts/LineChart.vue";
import AreaChart from "@/components/charts/AreaChart.vue";
import BarChart from "@/components/charts/BarChart.vue";

const userStore = useUserStore();

const { userList } = storeToRefs(userStore);

const tableData = computed(() => userList.value);

const { getUsers, deleteUser } = useUser();
const chartStore = useChartsStore();

const { chartCount, chartUserStat, chartOrderStat, chartRevenue } = storeToRefs(chartStore);

const { getCount, getUserStat, getOrderStat, getRevenueStat } = useChart();

const tableColumns = [
  { prop: "id", label: "ID", width: "auto" },
  { prop: "email", label: "Email", width: "250px" },
  { prop: "userName", label: "Tên người dùng", width: "auto" },
  { prop: "status", label: "Trạng thái", width: "auto" },
];

const handleEditData = (id: number) => { };

const handleDelete = async (id: number) => {
  await deleteUser(id);
  await getUsers();
  getUsers();
  getCount();
  getUserStat();
  getOrderStat();
  getRevenueStat();
};

onMounted(() => {
  getUsers();
  getCount();
  getUserStat();
  getOrderStat();
  getRevenueStat();
});
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard-featured">
      <el-card>
        <PieChart :labels="chartCount.labels" :series="chartCount.series" title="Thống kê số lượng thực thể"
          type="donut" />
      </el-card>
      <el-card>
        <PieChart :labels="chartUserStat.labels" :series="chartUserStat.series" title="Thống kê số lượng người đăng ký"
          type="polarArea" />
      </el-card>
      <el-card>
        <LineChart :labels="chartOrderStat.labels" :series="chartOrderStat.series"
          title="Thống kê số đơn hàng mỗi tháng" />
      </el-card>
      <el-card>
        <AreaChart :labels="chartRevenue.labels" :series="chartRevenue.series" title="Thống kê danh thu theo tháng" />
      </el-card>
    </div>
    <div class="dashboard-main">
      <el-card class="table" style="height: 530px;">
        <BaseTable style="width: 50%;" :data="tableData" :columns="tableColumns" :isHiddenComponent="true" :isHiddenExcel="true" :isHiddenUpdate="true" screen="người dùng"
          @edit="handleEditData" @delete="handleDelete" />
      </el-card>

      <el-card class="table" style="margin-left: 35px; height: 530px;">
        <BarChart :labels="chartCount.labels" :series="chartCount.series" />
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .dashboard-featured {
    width: 100%;
    display: flex;
    align-items: center;

    .el-card {
      height: 230px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      margin: 10px;
    }
  }

  .dashboard-main {
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 20px;

    .el-input {
      margin-bottom: 20px;
    }

    .table {
      width: 50%;
      height: auto;
      min-height: 500px;
    }
  }
}
</style>
