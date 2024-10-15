<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const sidebarList = [
  {
    name: "Tổng quan",
    route: "/admin/dashboard",
    icon: "pi-chart-line",
  },
  {
    name: "Sản phẩm",
    route: "/admin/product",
    icon: "pi-objects-column",
  },
  {
    name: "Danh mục",
    route: "/admin/category",
    icon: "pi-bars",
  },
  {
    name: "Đơn hàng",
    route: "/admin/order",
    icon: "pi-shopping-cart",
  },
  {
    name: "Bình luận",
    route: "/admin/comment",
    icon: "pi-comments",
  },
  {
    name: "Trang chủ",
    route: "/",
    icon: "pi-home",
  },
  {
    name: "Thoát",
    route: "/",
    icon: "pi-sign-out",
  },
];

const router = useRouter();

const route = useRoute();

const defaultIndexActive = ref(0);

const handleChangeSidebar = (index: number, path: string) => {
  defaultIndexActive.value = index;
  router.replace(path);
};


onMounted(() => {
  defaultIndexActive.value = sidebarList.findIndex(item => item.route === route.path)
})
</script>

<template>
  <el-card class="sidebar-container">
    <div class="menu-list">
      <div :class="defaultIndexActive === index ? 'menu-item active' : 'menu-item'" v-for="(item, index) in sidebarList"
        :key="item.name" @click="handleChangeSidebar(index, item.route)">
        <div style="
            border: 0.5px solid #e2e8f0;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
          ">
          <i :class="'pi ' + item.icon"></i>
        </div>
        &nbsp; &nbsp; &nbsp;
        <span>{{ item.name }}</span>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.sidebar-container {
  width: 210px;
  height: 100vh;
  color: #333;

  .menu-list {
    width: 100%;
    height: 100vh;
    overflow-y: auto;

    .menu-item {
      width: 100%;
      padding: 0 10px;
      height: 60px;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      cursor: pointer;

      &.active {
        background-color: #434a50;
        color: white;
      }
    }
  }
}
</style>
