<script setup>
import { RouterView } from 'vue-router'

import NavBar from './layout/NavBar.vue'
</script>

<template>
    <NavBar></NavBar>
    <!-- <LandingPage></LandingPage> -->
    <RouterView />
</template>
