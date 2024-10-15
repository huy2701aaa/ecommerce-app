<script lang="ts" setup>
import BaseTable from "@/base/BaseTable.vue";
import { ORDER_STATUS } from "@/common/enum";
import { useOrder } from "@/composables/useOrder";
import { useOrderStore } from "@/stores/order";
import { exportToExcel } from "@/utils/export";
import { formatCurrency } from "@/utils/format";
import type { TabsInstance } from "element-plus";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

const orderStore = useOrderStore();

const { orderList } = storeToRefs(orderStore);

const statusHelper = (payload: string) => {
  switch (payload) {
    case 'pending':
      return 'Chờ duyệt'
    case 'delivery':
      return 'Đang giao'
    case 'success':
      return 'Hoàn tất'
    default: return 'Đã huỷ'
  }
}

const tableData = computed(() =>
  orderList.value?.map((item) => {
    return {
      id: item.id,
      userId: item.user?.id,
      totalMoney: formatCurrency(item.totalMoney),
      userNote: item.userNote,
      orderStatus: statusHelper(item.orderStatus as string),
      email: item.user?.email,
      userName: item.user?.userName,
      phoneNumber: item.user?.userInfo?.phoneNumber,
      address: item.user?.userInfo?.address,
      paymentType: item.paymentType === 'normal' ? 'Tiền mặt' : 'Paypal'
    };
  })
);

const { getOrders, updateOrder } = useOrder();

const tableColumns = [
  { prop: "id", label: "#ID", width: "auto" },
  { prop: "email", label: "Email", width: "auto" },
  { prop: "phoneNumber", label: "Số điện thoại", width: "auto" },
  { prop: "address", label: "Địa chỉ", width: "auto" },
  { prop: "userName", label: "Tên người dùng", width: "auto" },
  { prop: "totalMoney", label: "Tổng tiền", width: "auto" },
  { prop: "paymentType", label: "Phương thức", width: "auto" },
  { prop: "userNote", label: "Ghi chú", width: "auto" },
  { prop: "orderStatus", label: "Trạng thái", width: "auto" },
];
const tabPosition = ref<TabsInstance["tabPosition"]>("left");

const statusIndex = ref<number>(0);

const handleEditData = async (id: number) => {
  switch (statusIndex.value) {
    case 0:
      await updateOrder({ orderStatus: ORDER_STATUS.DELIVERY }, id);
      await getOrders({
        orderStatus: ORDER_STATUS.PENDING,
      });

      break;

    case 1:
      await updateOrder({ orderStatus: ORDER_STATUS.SUCCESS }, id);
      await getOrders({
        orderStatus: ORDER_STATUS.DELIVERY,
      });

      break;

    default:
      await getOrders({
        orderStatus: ORDER_STATUS.PENDING,
      });
  }
};

const handleDelete = async (id: number) => {
  await updateOrder({ orderStatus: ORDER_STATUS.CANCEL }, id);
  await getOrders({
    orderStatus: ORDER_STATUS.CANCEL,
  });
};

const handleExportData = () => {
  exportToExcel(JSON.stringify(orderList.value));
};

onMounted(() =>
  getOrders({
    orderStatus: ORDER_STATUS.PENDING,
  })
);

const handleTabChange = async (value: string) => {
  statusIndex.value = parseInt(value);

  switch (parseInt(value)) {
    case 1:
      await getOrders({
        orderStatus: ORDER_STATUS.DELIVERY,
      });

      break;

    case 2:
      await getOrders({
        orderStatus: ORDER_STATUS.SUCCESS,
      });

      break;

    case 3:
      await getOrders({
        orderStatus: ORDER_STATUS.CANCEL,
      });

      break;

    default:
      await getOrders({
        orderStatus: ORDER_STATUS.PENDING,
      });
  }
};
</script>

<template>
  <div class="order-container">
    <el-card style="margin-top: 20px; margin-left: 20px; width: 250px; height: 300px">
      <el-tabs @tab-change="handleTabChange" :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
        <el-tab-pane label="Chờ duyệt"></el-tab-pane>
        <el-tab-pane label="Đang giao hàng"></el-tab-pane>
        <el-tab-pane label="Đơn hàng hoàn tất"></el-tab-pane>
        <el-tab-pane label="Đã huỷ đơn"></el-tab-pane>
      </el-tabs>
    </el-card>

    <div class="order-list">
      <BaseTable :data="tableData" :columns="tableColumns" :isHiddenComponent="true"
        :isHiddenUpdate="statusIndex === 2 || statusIndex === 3" screen="đơn hàng" @edit="handleEditData"
        @delete="handleDelete" @export="handleExportData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;

  .order-featured {
    width: 100%;
    display: flex;
    align-items: center;

    .el-card {
      height: 200px;
      flex: 1;
      margin: 20px;
    }
  }

  .order-list {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;

    .el-input {
      margin-bottom: 20px;
    }
  }

  .demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }

  .el-tabs--right .el-tabs__content,
  .el-tabs--left .el-tabs__content {
    height: 100%;
  }
}
</style>
