<script setup lang="ts">
import { useProduct } from "@/composables/useProduct";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const { setUser } = useUserStore();
const { user } = storeToRefs(useUserStore());
const { cartList } = storeToRefs(useCartStore());
const cartStore = useCartStore();
const { getProducts } = useProduct();
const { setFilter } = useProductStore();

const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
  cartStore.$reset();
};

const q = ref<string>("");

const handleFilter = async () => {
  setFilter({ q: q.value });

  setTimeout(async () => {
    await getProducts();
  }, 1000);
};

const isAdmin = computed(() =>
  user?.value?.userRoles?.find((item) => item.role.roleName === "super_admin")
);

const handleToHome = () => {
  window.location.href = "/"
}
</script>

<template>
  <div class="navbar">
    <div class="top">
      <div class="top-item logo">
        <div style="cursor: pointer;" @click="handleToHome">
          <img style="object-fit: cover;" width="200px" height="90px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStrYqXRWsdtSLitdeuRn-1cwpjl3Jy40fYKg&s" alt="" />
        </div>
      </div>
      <div class="top-item search">
        <input @input="handleFilter" v-model="q" type="text" placeholder="Tìm sản phẩm bạn muốn..." />
        <button>
          <el-icon>
            <Search />
          </el-icon>
        </button>
      </div>
      <div class="top-item action">
        <div v-if="isAdmin" class="item">
          <i class="pi pi-building-columns"></i>&nbsp;
          <router-link style="color: inherit; text-decoration: none" to="/admin/dashboard">
            <span>Trang quản trị</span>
          </router-link>
        </div>
        <div class="item" v-if="user">
          <i class="pi pi-shopping-bag"></i>&nbsp;
          <router-link style="color: inherit; text-decoration: none" to="/my-order">
            <span>Đơn hàng</span>
          </router-link>
        </div>
        <div class="item">
          <i class="pi pi-heart"></i>&nbsp;
          <span>Yêu thích</span>
        </div>
        <div class="item">
          <i class="pi pi-shopping-cart"></i>&nbsp;
          <router-link style="color: inherit; text-decoration: none" to="/cart"><span>Giỏ hàng (<b style="color: red">{{
            cartList.length }}</b>)</span></router-link>
        </div>
        <div class="item" v-if="!user">
          <i class="pi pi-user"></i>&nbsp;
          <router-link style="color: inherit; text-decoration: none" to="/login"><span>Đăng nhập</span></router-link>
          <span>&nbsp;|&nbsp;</span>
          <router-link style="color: inherit; text-decoration: none" to="/register"><span>Đăng ký</span></router-link>
        </div>

        <div v-if="user" class="item">
          <i class="pi pi-user"></i>&nbsp;
          <span><b style="color: green; font-size: 20px">{{
            user.userName
          }}</b></span>
        </div>

        <div v-if="user" class="item" @click="handleLogout">
          <i class="pi pi-spin pi-cog"></i>

          <span>Thoát</span>
        </div>
      </div>
    </div>

    <!-- <div class="bottom">
      <i style="margin-left: 65px; font-weight: bold; cursor: pointer" class="pi pi-bars"></i>
      <ul>
        <li class="active">Trang chủ</li>
        <li>Sản phẩm</li>
        <li>Danh mục</li>
        <li>Bài viết</li>
        <li>Liên hệ</li>
      </ul>
    </div> -->
  </div>
  <div class="hr"></div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 20px 150px;
  font-weight: 500;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: #FFFFFF;
  border-bottom: 0.5px solid  #EEEEEE;

  .top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .top-item {
      margin: 0 20px;
      width: max-content;
    }

    .search {
      border: 1px solid #3f51b5;
      border-radius: 5px;
      height: 45px;
      display: flex;
      align-items: center;
      width: 100%;

      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        border-radius: 5px;
        padding-left: 10px;
      }

      button {
        width: 60px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #3f51b5;
        color: white;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;

        &:hover {
          background-color: #1f39cc;
        }
      }
    }

    .action {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .item {
        display: flex;
        align-items: center;
        width: max-content;
        margin-left: 25px;
        height: max-content;
        cursor: pointer;
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;

    ul {
      width: 100%;
      display: flex;
      list-style: none;
      justify-content: center;
      align-items: flex-end;
      margin-top: 10px;

      li {
        margin: 0 50px;
        cursor: pointer;
        padding-bottom: 5px;

        &.active {
          border-bottom: 3px solid #3f51b5;
        }
      }
    }
  }
}

.hr {
  width: 100%;
  height: 1px;
  background-color: rgba(128, 128, 128, 0.205);
  margin-top: 10px;
}
</style>
