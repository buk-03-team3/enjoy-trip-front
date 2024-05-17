<script setup>
import { RouterView } from 'vue-router'

import NavBar from './layout/NavBar.vue'
import Footer from './layout/Footer.vue'
import KakaoMap from './components/map/KakaoMap.vue'
import LoginPage from './components/user/LoginPage.vue'
</script>

<template>
    <NavBar />
    <!-- <KakaoMap></KakaoMap> -->
    <div class="content"></div>
    <RouterView />
    <!-- <LoginPage /> -->
    <Footer></Footer>
</template>

<style scoped>
.content {
    padding-top: 2vmax; /* NavBar height */
}
</style>
