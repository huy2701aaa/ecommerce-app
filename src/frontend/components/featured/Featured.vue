<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
//:autoplay="3000" :wrap-around="true"
</script>

<template>
  <div style="width: 100vw">
    <Carousel :autoplay="3000" :wrap-around="true">
      <Slide key="2">
        <div class="carousel__item">
          <img
            width="100%"
            height="100%"
            src="https://cmsv2.yame.vn/uploads/10114fd2-dc1f-455b-89dc-eee2737a7b1e/BST_Mi%e1%bb%81n_Gi%c3%b3_C%c3%a1t.jpg?quality=80&w=0&h=0"
            alt=""
          />
        </div>
      </Slide>
      <Slide key="1">
        <div class="carousel__item">
          <img
            width="100%"
            height="100%"
            src="https://cmsv2.yame.vn/uploads/7ca024af-e809-4915-a195-8c94f18053b8/BST_The_Seafarer.jpg?quality=80&w=0&h=0"
            alt=""
          />
        </div>
      </Slide>
      <Slide key="3">
        <div class="carousel__item">
          <img
            width="100%"
            height="100%"
            src="https://cmsv2.yame.vn/uploads/00103d56-692d-4706-82c2-7bcdec247869/BST_The_Day's_Eye.jpg?quality=80&w=0&h=0"
            alt=""
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style scoped lang="scss">
.carousel__item {
  height: 77vh;
  width: 100vw;
  font-size: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f3f3;

  img {
    object-fit: cover;
  }

  h1 {
    font-size: 50px;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      text-align: left;
      margin: 40px 0;
      color: gray;
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
