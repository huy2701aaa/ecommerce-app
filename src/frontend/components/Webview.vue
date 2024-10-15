<script lang="ts" setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import { RouterView } from "vue-router";
</script>
<template>
    <div class="web-container">
        <Navbar />
        <RouterView />
        <Footer />
    </div>
</template>