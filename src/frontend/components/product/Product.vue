<script setup lang="ts">
import type { TProduct } from "@/common/type";
import { computed } from "vue";
import { formatCurrency } from "@/utils/format";

const props = defineProps<{
  product: TProduct;
}>();

const colors = computed(() => props.product?.color.split(","));
const sizes = computed(() => props.product?.size.split(","));

</script>

<template>
  <router-link style="text-decoration: none;" class="product-container" :to="`/product/${props.product?.id}`">
    <img :src="props.product?.image" alt="" />
    <div class="main">
      <div class="product-cate">
        <div style="margin-bottom: 10px">
          <span>#Đã bán: <b>{{ product.sold }}</b></span>
          <span v-if="parseFloat(product.newPrice) > 300000">
            <i class="pi pi-spin pi-star"></i>&nbsp;
            <i class="pi pi-spin pi-star"></i>&nbsp;
            <i class="pi pi-spin pi-star"></i>&nbsp;
            <i class="pi pi-spin pi-star"></i>&nbsp;
            <i class="pi pi-spin pi-star"></i>&nbsp;
          </span>

          <span v-else>
            <i style="color: green;" class="pi pi-spin pi-star"></i>&nbsp;
            <i style="color: green;" class="pi pi-spin pi-star"></i>&nbsp;
            <i style="color: green;" class="pi pi-spin pi-star"></i>&nbsp;
            <i style="color: green;" class="pi pi-spin pi-star"></i>&nbsp;
          </span>
        </div>
        <span style="
              color: #333;
              display: block;
              font-weight: 500;
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            ">{{ props.product?.name }}</span>
      </div>

      <div class="product-price">
        <span style="text-decoration: line-through">{{
          formatCurrency(props.product?.oldPrice)
        }}</span>
        <span style="font-weight: bold; color: red">{{
          formatCurrency(props.product?.newPrice)
        }}</span>
      </div>

      <div class="bottom">
        <div class="color-list">
          <div v-for="color in colors.slice(0, 3)" :key="color" class="color"
            :style="`background-color: ${color}; opacity: 0.5; border: 3px solid #EEEEEE`"></div>
        </div>
        <div class="size-list">
          <div v-for="size in sizes" :key="size" class="size">{{ size }}</div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.product-container {
  width: 20%;
  height: auto;
  margin: 10px 0;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px solid rgba(128, 128, 128, 0.26);
  border-radius: 5px;
  color: gray;
  margin: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: all 0.5s ease;
  }

  img {
    width: 100%;
    height: 280px;
    margin-bottom: 10px;
    object-fit: contain;
    border-radius: 5px;
  }

  .main {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;

    .product-cate {
      width: 100%;
      height: auto;

      div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      i {
        color: orange;
      }
    }

    .product-price {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
  }

  .bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    .color-list {
      display: flex;
      align-items: center;
      height: auto;
      flex: 1;

      .color {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: pink;
        margin-right: 10px;
      }
    }

    .size-list {
      display: flex;
      align-items: center;
      height: auto;
      flex: 1;
      justify-content: flex-end;

      .size {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: #eeeeee;
        margin-right: 10px;
        text-align: center;
        line-height: 20px;
      }
    }
  }
}
</style>
