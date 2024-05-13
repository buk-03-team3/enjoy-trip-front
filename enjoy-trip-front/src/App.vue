<script setup>
import { RouterView } from 'vue-router'

import NavBar from './layout/NavBar.vue'
import KakaoMap from './components/map/KakaoMap.vue'
import Footer from './layout/Footer.vue'
</script>

<template>
    <NavBar />
    <!-- <KakaoMap></KakaoMap> -->
    <!-- <LandingPage></LandingPage> -->
    <br />
    <RouterView />
    <!-- <Footer></Footer> -->
</template>
