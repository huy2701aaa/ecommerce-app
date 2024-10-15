<script setup lang="ts">
import { useCategory } from "@/composables/useCategory";
import Category from "./Category.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";

const { getCategoryList } = useCategory();

const { categoryList } = storeToRefs(useCategoryStore());

onMounted(() => {
  getCategoryList();
});
</script>

<template>
  <h2 style="margin-top: 50px">Danh mục</h2>
  <div class="category-list">
    <Category v-for="item in categoryList" :key="item.id" :category="item" />
  </div>
</template>

<style lang="scss" scoped>
.category-list {
  margin-top: 100px;
  min-height: 200px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>
