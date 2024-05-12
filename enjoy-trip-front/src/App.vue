<script setup>
import { RouterView } from 'vue-router'

import NavBar from './layout/NavBar.vue'
import KakaoMap from './components/map/KakaoMap.vue';
</script>

<template>
    <NavBar></NavBar>
    <KakaoMap></KakaoMap>
    <!-- <LandingPage></LandingPage> -->
    <!-- <RouterView /> -->
</template>
