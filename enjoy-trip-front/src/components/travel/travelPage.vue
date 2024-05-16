<template>
    <div class = "ExploreTour my-5">
        <div class="tab-class text-center ">
            <ul class="nav nav-pills d-inline-flex justify-content-center mb-5">
            </ul>
            <div><RegionSearchBarComponent></RegionSearchBarComponent></div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import RegionSearchBarComponent from './region/RegionSearchBarComponent.vue'

</script>
