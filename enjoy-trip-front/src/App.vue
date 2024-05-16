<script setup>
import { RouterView } from 'vue-router'

import NavBar from './layout/NavBar.vue'
import Footer from './layout/Footer.vue';
import KakaoMap from './components/map/KakaoMap.vue';
</script>

<template>
    <NavBar />
    <div style="height: 2.5vmax;"></div>
    <!-- <KakaoMap></KakaoMap> -->
    <RouterView />
    <Footer></Footer>

</template>