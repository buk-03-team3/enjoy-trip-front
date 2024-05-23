<script setup>
import { useTravelStore } from '@/stores/travelStore'
import { storeToRefs } from 'pinia'
import KakaoMap from '@/components/map/KakaoMap.vue'
const travelStore = useTravelStore()
travelStore.getSidoList()
</script>
<template>
    <!-- Header End -->
    <div class="mx-auto text-center mb-5 mt-5" style="max-width: 900px">
        <h5 class="section-title px-3 kakao-bold">Travel</h5>
        <h1 class="mb-4 kakao-bold">관광지 조회</h1>
    </div>
    <div class="container-fluid search-bar position-relative">
        <div class="container">
            <div class="position-relative rounded-pill mb-3 align-items-center mx-auto p-3" style="background: #F3F4F1">
                <div class="row">
                    <div class="col md-4">
                        <select style="color:black; font-size: 1.2vmax; border: 2px solid black;" v-model="travelStore.sidoObj" class="form-select btn btn-white rounded-pill dropdown-togglecontentsButton kakao-regular" type="button" aria-expanded="false">
                            <option value="" disabled selected>시도</option>
                            <option v-for="sido in travelStore.sidoList" :value="sido" :key="sido.sidoCode" v-bind="travelStore.sidoName">{{ sido.sidoName }}</option>
                        </select>
                    </div>
                    <div class="col md-4">
                        <select
                            v-model="travelStore.gugunObj"
                            @click="travelStore.getGugunList()"
                            class="form-select btn btn-white rounded-pill dropdown-toggle contentsButton kakao-regular"
                            type="button"
                            aria-expanded="false"
                            style="color:black; font-size: 1.2vmax; border: 2px solid black;"
                        >
                            <option value="" disabled selected>구군</option>
                            <option v-for="gugun in travelStore.gugunList" :value="gugun" :key="gugun.gugunCode">{{ gugun.gugunName }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr style="border: none; border-top: 5px solid black;" />
            <div class="row contentType mb-3 pb-3 kakao-bold gap-2 justify-content-between" style="border-radius: 10%; font-size: 1vmax">
                <div
                    class="col-md-2 contents-items d-flex justify-content-center align-items-center"
                    :class="{ selected: travelStore.selectContent[12] }"
                    value="12"
                    @click="travelStore.contentSelect(12)"
                    type="button"
                >
                    관광지🗽
                </div>
                <div
                    class="col-md-2 contents-items d-flex justify-content-center align-items-center"
                    :class="{ selected: travelStore.selectContent[14] }"
                    value="14"
                    @click="travelStore.contentSelect(14)"
                    type="button"
                >
                    문화시설⛲
                </div>
                <div
                    class="col-md-2 contents-items d-flex justify-content-center align-items-center"
                    :class="{ selected: travelStore.selectContent[15] }"
                    value="15"
                    @click="travelStore.contentSelect(15)"
                    type="button"
                >
                    축제공연행사🎆
                </div>
                <div
                    class="col-md-2 contents-items d-flex justify-content-center align-items-center"
                    :class="{ selected: travelStore.selectContent[25] }"
                    value="25"
                    @click="travelStore.contentSelect(25)"
                    type="button"
                >
                    여행코스🏖
                </div>
            </div>
            <div class="row contentType mb-3 pb-3 kakao-bold gap-2 justify-content-between" style="border-radius: 20px; font-size: 1vmax">
                <div
                    class="col-md-2 contents-items d-flex justify-content-center align-items-center"
                    :class="{ selected: travelStore.selectContent[28] }"
                    value="28"
                    @click="travelStore.contentSelect(28)"
                    type="button"
                >
                    레포츠🏄
                </div>
                <div
                    class="col-md-2 contents-items d-flex justify-content-center align-items-center"
                    :class="{ selected: travelStore.selectContent[32] }"
                    value="32"
                    @click="travelStore.contentSelect(32)"
                    type="button"
                >
                    숙박🏠
                </div>
                <div
                    class="col-md-2 contents-items d-flex justify-content-center align-items-center"
                    :class="{ selected: travelStore.selectContent[38] }"
                    value="38"
                    @click="travelStore.contentSelect(38)"
                    type="button"
                >
                    쇼핑🛍
                </div>
                <div
                    class="col-md-2 contents-items d-flex justify-content-center align-items-center"
                    :class="{ selected: travelStore.selectContent[39] }"
                    value="39"
                    @click="travelStore.contentSelect(39)"
                    type="button"
                >
                    음식점🍖
                </div>
            </div>
            <button onclick="#" style="font-size:1.2vmax; background-color: #222; color:white" type="button" class="bm-hanna-air btn col md-4" @click="travelStore.searchTravel()">검색</button>

            <hr style="border: none; border-top: 5px solid black;" />
        </div>
    </div>

    <KakaoMap></KakaoMap>
</template>

<style scoped>
.contents-items {
    
    border: black solid 2px;
    border-radius: 25%;
    font-size: 1.2vmax
}
.selected {
    background-color: black;
    color: white;
}
</style>
