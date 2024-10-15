<script setup lang="ts">
import Featured from "../components/featured/Featured.vue";
import CategoryList from '../components/category/CategoryList.vue'
import ProductList from "../components/product/ProductList.vue";
import Info from "../components/Info.vue";
</script>

<template>
  <div class="home">
    <Featured />
    <CategoryList />
    <ProductList :isSetCss="true" />
    <Info />
  </div>
</template>


<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  overflow-x: hidden;
}
</style>
