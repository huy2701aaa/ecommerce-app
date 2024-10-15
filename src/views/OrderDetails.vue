<script lang="ts" setup>
import BaseTable from "@/base/BaseTable.vue";
import { useOrder } from "@/composables/useOrder";
import { useOrderStore } from "@/stores/order";
import { formatDate } from "@/utils/format";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export type TOrderDetails = {
  name?: string;
  image?: string;
  quantity?: number;
  totalMoney?: number;
};

type TStatus = {
  content: string;
  color: string;
  key: string;
};

const orderStore = useOrderStore();

const { singleOrder } = storeToRefs(orderStore);
const tableData = ref<TOrderDetails[]>([]);
const route = useRoute();

const id = computed(() => parseInt(route.params.id as string));

const { getSingleOrder } = useOrder();

const tableColumns = [
  { prop: "name", label: "Tên sản phẩm", width: "auto" },
  { prop: "image", label: "Ảnh sản phẩm", width: "auto" },
  { prop: "newPrice", label: "Giá sản phẩm", width: "auto" },
  { prop: "size", label: "Kích cỡ", width: "auto" },
  { prop: "color", label: "Màu sắc", width: "auto" },
  { prop: "quantity", label: "Số lượng", width: "auto" },
  { prop: "totalMoney", label: "Tổng tiền", width: "auto" },
  { prop: "createdAt", label: "Ngày đặt hàng", width: "auto" },
];

const status = ref<TStatus[]>([
  {
    content: "Chờ duyệt",
    color: "#0bbd87",
    key: "pending",
  },
  {
    content: "Đang giao hàng",
    color: "#0bbd87",
    key: "delivery",
  },
  {
    content: "Đơn hàng hoàn tất",
    color: "#0bbd87",
    key: "success",
  },
  {
    content: "Đã hủy đơn",
    color: "#0bbd87",
    key: "cancel",
  },
]);

watch(
  () => singleOrder.value,
  () => {
    status.value = status.value.map((item) => ({
      ...item,
      color: singleOrder.value?.orderStatus === item.key ? "#0bbd87" : "",
    }));
  }
);

const handleEditData = (id: number) => {};

onMounted(async () => {
  await getSingleOrder(id.value);

  tableData.value = singleOrder.value?.orderDetails?.map((item) => {
    return {
      name: item?.product?.name,
      image: item?.product?.image,
      quantity: item?.quantity,
      color: item.color,
      size: item.size,
      totalMoney: Math.ceil(
        parseFloat(item.product?.newPrice as string) * (item?.quantity || 1)
      ),
      createdAt: formatDate(item.createdAt as string),
    } as TOrderDetails;
  }) as TOrderDetails[];
});
</script>

<template>
  <div class="order-details-container">
    <el-card style="margin-top: 20px;">
      <el-timeline style="max-width: 600px; width: 250px; margin-top: 25px; color: gray">
      <el-timeline-item
        style="height: 100px;"
        v-for="(activity, index) in status"
        :key="index"
        :color="activity.color"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
    </el-card>
    <div class="order-container">
      <div class="order-list">
        <BaseTable
          :data="tableData"
          :columns="tableColumns"
          :isHiddenComponent="true"
          :isHiddenAction="true"
          screen="chi tiết đơn hàng"
          @edit="handleEditData"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-details-container {
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 20px;
}

.order-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    .el-input {
      margin-bottom: 20px;
    }
  }
}
</style>
