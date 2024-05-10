<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LandingPage from './components/landing/LandingPage.vue'

import NavBar from './layout/NavBar.vue';
</script>

<template>
    <NavBar></NavBar>
    <!-- <LandingPage></LandingPage> -->
    <RouterView />
</template>
