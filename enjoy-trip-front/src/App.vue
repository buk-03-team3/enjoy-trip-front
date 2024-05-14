<script setup>
import { RouterView } from 'vue-router'

import NavBar from './layout/NavBar.vue'
import Footer from './layout/Footer.vue';
</script>

<template>
    <NavBar />
    <div style="height: 2.5vmax;"></div>
    <RouterView />
    <Footer></Footer>
</template>
