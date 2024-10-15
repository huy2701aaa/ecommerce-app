<script setup lang="ts">
import type { TCategory } from "@/common/type";

const props = defineProps<{
  category: TCategory;
}>();
</script>

<template>
  <router-link style="text-decoration: none;" class="category-container" :to="`/category/${props.category.id}`">
    <div class="category-img">
      <img :src="props.category.image" alt="" />
    </div>
    <span style="margin-top: 50px; font-weight: bold">{{
      props.category.name
    }}</span>
    <span>({{ props.category.products?.length }}) sản phẩm</span>
  </router-link>
</template>

<style lang="scss" scoped>
.category-container {
  width: 15%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  background-color: #f7f7f8;
  border-radius: 10px;
  margin: 50px 25px;
  cursor: pointer;

  .category-img {
    display: flex;
    width: 120px;
    height: 120px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #ecf0ff;
    position: absolute;
    top: -50%;
    transform: translateY(50%);

    img {
      width: 80%;
      height: 80%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  span {
    color: gray;
  }
}
</style>
