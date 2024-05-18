<script setup>
import {useRecommendStore} from '@/stores/recommendStore'
import { ref, computed, watch } from 'vue'
const recommendStore = useRecommendStore();
recommendStore.recommendWithUserAddr();
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
    <ol>
        <il v-for="(recommendElement, index) in recommendStore.recommendList" :key="index">
            {{ recommendElement.title }} | {{ recommendElement.addr1 }}
            <br>
        </il>
    </ol>

    <div>==================================</div>
    <button @click="recommendStore.recommendWithFavoriteAddr">즐겨찾기 주소</button>

    <div>==================================</div>
    <button @click="recommendStore.recommendWithFavoriteContent">즐겨찾기 컨텐츠</button>


</template>