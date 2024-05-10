<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LandingPage from './components/landing/LandingPage.vue'
import travelPage from './components/travel/travelPage.vue'
</script>

<template>
    <LandingPage></LandingPage>
    <travelPage></travelPage>
    <RouterView />
</template>
