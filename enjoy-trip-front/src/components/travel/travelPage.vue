<template>
    <div class = "ExploreTour my-5">
        <div class="tab-class text-center ">
            <ul class="nav nav-pills d-inline-flex justify-content-center mb-5">
                <li class="nav-item">
                    <a class="d-flex mx-3 py-2 border border-primary bg-light rounded-pill active" data-bs-toggle="pill" href="#NationalTab-1">
                        <span class="text-dark" style="width: 250px" @click="regionSearch()">지역별 검색</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="d-flex py-2 mx-3 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#InternationalTab-2">
                        <span class="text-dark" style="width: 250px" @click="contentsSearch()">컨텐츠별 검색</span>
                    </a>
                    <!-- ddd -->
                </li>
            </ul>
            <div v-show="toggle"><RegionSearchBarComponent></RegionSearchBarComponent></div>
            <div v-show="!toggle"><ContentsSearchBarComponent></ContentsSearchBarComponent></div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import ContentsSearchBarComponent from './contents/ContentsSearchBarComponent.vue'
import RegionSearchBarComponent from './region/RegionSearchBarComponent.vue'
const toggle = ref(true)
const regionSearch = () => {
    toggle.value = true
}
const contentsSearch = () => {
    toggle.value = false
}
</script>
