<script lang="ts" setup>
import BaseTable from "@/base/BaseTable.vue";
import { ORDER_STATUS } from "@/common/enum";
import ProductForm from "@/components/ProductForm.vue";
import { useCategory } from "@/composables/useCategory";
import { useOrder } from "@/composables/useOrder";
import { useProduct } from "@/composables/useProduct";
import { useAppStore } from "@/stores/app";
import { useOrderStore } from "@/stores/order";
import { useProductStore } from "@/stores/product";
import { exportToExcel } from "@/utils/export";
import { formatCurrency } from "@/utils/format";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";

const { getProducts, deleteProduct, getSingleProduct, getProductSellTheMost } =
  useProduct();

const appStore = useAppStore();
const { isShowActionForm } = storeToRefs(appStore);

const { getCategoryList } = useCategory();
const { getOrders } = useOrder();

const productStore = useProductStore();

const { orderList } = storeToRefs(useOrderStore());

const { productList, singleProduct } = storeToRefs(productStore);

const tableData = computed(() => productList.value.map(item => {
  return { ...item, newPrice: formatCurrency(item.newPrice), oldPrice: formatCurrency(item.oldPrice) }
}));

const tableColumns = [
  { prop: "id", label: "#ID", width: "auto" },
  { prop: "image", label: "Ảnh", width: "auto" },
  { prop: "name", label: "Tên", width: "auto" },
  { prop: "description", label: "Mô tả", width: "auto" },
  { prop: "size", label: "Kích cỡ", width: "auto" },
  { prop: "color", label: "Màu sắc", width: "auto" },
  { prop: "oldPrice", label: "Giá cũ", width: "auto" },
  { prop: "newPrice", label: "Giá mới", width: "auto" },
  { prop: "sold", label: "Đã bán", width: "auto" },
  { prop: "stock", label: "Tồn kho", width: "auto" },
  { prop: "status", label: "Trạng thái", width: "auto" },
];

const handleEditData = (id: number) => {
  getSingleProduct(id);
};

const handleDelete = async (id: number) => {
  await deleteProduct(id);
  await getProducts();
};

const selled = ref(0);
const revenua = ref(0);
const sellTotal = ref(0);

watch(
  () => productList.value,
  () => {
    sellTotal.value += productList.value.reduce((x, y) => {
      return x + parseFloat(y.oldPrice);
    }, 0);
  }
);

watch(
  () => orderList.value,
  () => {
    selled.value = orderList.value.reduce((initValue, nextValue) => {
      if (nextValue.orderStatus === ORDER_STATUS.SUCCESS) {
        const orderSuccessNum = nextValue.orderDetails?.length || 0;
        revenua.value = revenua.value + parseFloat(nextValue.totalMoney);
        return Number(initValue) + orderSuccessNum;
      } else {
        return initValue;
      }
    }, 0);
  }
);

const handleExportFile = () => {
  exportToExcel(productList.value)
}

onMounted(async () => {
  getProducts();
  getCategoryList();
  getOrders();
  getProductSellTheMost();
});
</script>

<template>
  <div class="product-container">
    <div class="product-featured">
      <el-card style="display: flex; align-items: center; justify-content: center"><span>Số lượng:
          <b style="font-size: 25px">{{ productList.length }}</b></span></el-card>
      <el-card style="display: flex; align-items: center; justify-content: center"><span>Đã bán: <b
            style="font-size: 25px">{{ selled }}</b></span></el-card>
      <el-card style="display: flex; align-items: center; justify-content: center"><span>Tổng doanh thu:
          <b style="font-size: 25px; color: red">{{
            formatCurrency(revenua)
          }}</b></span><br />
      </el-card>
      <el-card style="display: flex; align-items: center; justify-content: center"><span> Sản phẩm bán chạy nhất:
        </span><br />
        <div style="
            display: flex;
            margin-top: 10px;
            cursor: pointer;
            box-shadow: 2px 2px 25px 0px rgba(45, 103, 191, 0.75);
            -webkit-box-shadow: 2px 2px 25px 0px rgba(45, 103, 191, 0.75);
            -moz-box-shadow: 2px 2px 25px 0px rgba(45, 103, 191, 0.75);
            padding: 10px;
            border-radius: 5px;
          ">
          <img width="90x" height="90px" style="object-fit: cover" :src="singleProduct?.image" alt="" />
          <div style="
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              margin-left: 10px;
              border-radius: 5px;
            ">
            <span>#ID: <b>{{ singleProduct?.id }}</b></span>
            <span>Giá :
              <b style="color: blue">
                {{ formatCurrency(singleProduct?.newPrice) }}</b></span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="product-list">
      <BaseTable styleValue="height:500px" :data="tableData" :columns="tableColumns" screen="sản phẩm"
        @edit="handleEditData" @delete="handleDelete" @export="handleExportFile" />
    </div>
    <ProductForm v-if="isShowActionForm" />
  </div>
</template>

<style lang="scss" scoped>
.product-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .product-featured {
    width: 100%;
    display: flex;
    align-items: center;

    .el-card {
      height: 200px;
      flex: 1;
      margin: 20px;
    }
  }

  .product-list {
    width: 100%;
    height: auto;
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
