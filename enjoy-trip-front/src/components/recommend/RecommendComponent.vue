<script setup>
import {useRecommendStore} from '@/stores/recommendStore'
import { ref, computed, watch } from 'vue'
import RecommendSilder from './RecommendSilder.vue';
const recommendStore = useRecommendStore();
recommendStore.recommendWithUserAddr();
recommendStore.recommendWithFavoriteAddr();
recommendStore.recommendWithFavoriteContent();
/*
"attractionId": 2786896,
            "contentTypeId": 12,
            "title": "함양 덕전리 마애여래입상(덕전리마애불상)",
            "addr1": "경상남도 함양군 마천면 덕전길 103-104",
            "addr2": "",
            "zipcode": "50055",
            "tel": "",
            "first_image": null,
            "first_image2": null,
            "readCount": 0,
            "favoriteCount": 0,
            "gugunCode": 20,
            "sidoCode": 36,
            "latitude": 35.38491904,
            "longitude": 127.6556447,
            "mlevel": "6"
*/

</script>

<template>
     <div class="mx-auto text-center mb-5 mt-5" style="max-width: 900px">
        <h5 class="section-title px-3 kakao-bold">Recommend Travel</h5>
        <h1 class="mb-4 kakao-bold">여행지 추천</h1></div>
    <RecommendSilder></RecommendSilder>
</template>