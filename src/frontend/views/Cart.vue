<script lang="ts" setup>
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { formatCurrency } from "@/utils/format";

const { addCart, removeCart, decrementCart } = useCartStore();
const { cartList, total } = storeToRefs(useCartStore());

const handleRemoveCart = (id: number) =>{
  console.log(id)
  removeCart(id)
}
</script>

<template>
  <el-card class="cart">
    <h2 style="
        display: flex;
        align-items: center;
        text-align: center;
        margin-bottom: 30px;
        margin-left: 10px;
      ">
      Giỏ hàng
    </h2>
    <el-table :data="cartList" style="width: 100%">
      <el-table-column label="Ảnh sản phẩm" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <img width="90px" height="90px" :src="scope.row.product.image" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Chi tiết" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <div>
              <span>Màu sắc:
                <div :style="`
                    width: 18px;
                    height: 18px;
                    background-color: ${scope.row.product.color};
                    border-radius: 5px;
                    opacity: 0.5
                  `"></div>
              </span>
              <span>Kích cỡ:
                <div style="
                    width: 20px;
                    height: 20px;
                    background-color: #eeeeee;
                    text-align: center;
                    line-height: 20px;
                  ">
                  {{ scope.row.product.size }}
                </div>
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Giá" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="color: blue; font-weight: bold">{{ scope.row.product.newPrice }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Số lượng" width="180">
        <template #default="scope">
          <el-button @click="decrementCart(scope.row.product.id)">-</el-button>
          <span style="margin: 0 15px">{{ scope.row.quantity }}</span>
          <el-button @click="addCart(scope.row.product, 1)">+</el-button>
        </template>
      </el-table-column>

      <el-table-column label="Tổng tiền" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="color: red; font-weight: bold">{{ formatCurrency(scope.row.product.newPrice *
              scope.row.quantity) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác">
        <template #default="scope">
          <el-button size="small" type="danger" @click="() => handleRemoveCart(scope.row.product.id)">
            <i class="pi pi-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <div class="bottom">
    <div style="margin-top: 20px">
      <span>Tổng tiền : &nbsp;</span>
      <span style="color: red; font-weight: bold">{{ cartList.length ? formatCurrency(total) : formatCurrency(0)
        }}</span>
    </div>

    <router-link style="text-decoration: none; color: inherit;" to="/payment">
      <el-button type="primary" style="height: 45px; margin-top: 30px">Thanh toán</el-button>
    </router-link>
  </div>
</template>

<style lang="scss" setup>
.cart {
  width: 70%;
  padding: 0 200px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bottom {
  width: 80%;
  padding: 0 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}
</style>
