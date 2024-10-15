<script setup lang="ts">
import { useProduct } from "@/composables/useProduct";
import Product from "./Product.vue";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";

const { getProducts } = useProduct();

const { productList } = storeToRefs(useProductStore());

const props = defineProps<{
  hiddenTitle?: boolean;
  isSetCss?: boolean;
}>();

onMounted(() => {
  getProducts();
});
</script>

<template>
  <h2 v-if="!props.hiddenTitle">Sản phẩm nổi bật</h2>
  <div class="product-list" :style="props.isSetCss && 'padding: 0 200px'">
    <Product v-for="item in productList" :key="item.id" :product="item" />
  </div>
</template>

<style lang="scss" scoped>
.product-list {
  margin-top: 50px;
  min-height: 200px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>
