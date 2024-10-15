<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from './Sidebar.vue';
import { RouterView } from "vue-router";
</script>

<template>
    <div class="app-container">
        <Sidebar />
        <div class="main">
            <RouterView />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.app-container {
    display: flex;
    width: 100%;
    overflow-y: hidden;
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }
}
</style>