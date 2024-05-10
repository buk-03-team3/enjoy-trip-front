<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LandingPage from './components/landing/LandingPage.vue'
import TravelPage from './components/travel/TravelPage.vue';
</script>

<template>
    <LandingPage></LandingPage>
    <TravelPage></TravelPage>
    <RouterView />
</template>
