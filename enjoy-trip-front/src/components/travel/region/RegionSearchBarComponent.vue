<script setup>
import {useTravelStore} from '@/stores/travelStore'
import { storeToRefs } from 'pinia';
import KakaoMap from '@/components/map/KakaoMap.vue';
const travelStore = useTravelStore();
travelStore.getSidoList();

</script>
<template>
    <!-- Header End -->
     <div class="mx-auto text-center mb-5 mt-5" style="max-width: 900px">
        <h5 class="section-title px-3 kakao-bold">Travel</h5>
        <h1 class="mb-4 kakao-bold">관광지 조회</h1></div>
    <div class="container-fluid search-bar position-relative" >
        <div class="container">
            <div class="position-relative rounded-pill mb-3 align-items-center mx-auto p-3" style="background: white">
                <div class="row">
                    <div class="col md-4">
                        <select v-model="travelStore.sidoObj" class="form-select btn btn-primary rounded-pill dropdown-togglecontentsButton kakao-regular" type="button" aria-expanded="false">
                            <option value="" disabled selected>시도</option>
                            <option v-for="sido in travelStore.sidoList" :value="sido" 
                            :key="sido.sidoCode" v-bind="travelStore.sidoName">{{sido.sidoName}}</option>
                        </select>
                    </div>
                    <div class="col md-4">
                        <select v-model="travelStore.gugunObj" @click="travelStore.getGugunList()" class="form-select btn btn-primary rounded-pill dropdown-toggle contentsButton kakao-regular" type="button" aria-expanded="false">
                            <option value="" disabled selected>구군</option>
                            <option v-for="gugun in travelStore.gugunList" :value="gugun" 
                            :key="gugun.gugunCode">{{gugun.gugunName}}</option>
                        </select>
                    </div>
                </div>
            </div>
<div class="row contentType mb-3 pb-3 bm-hanna-pro gap-2 justify-content-between" style="border-radius: 20px; font-size: 1vmax;" >
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: travelStore.selectContent[12] }"  value="12" @click="travelStore.contentSelect(12)">관광지🗽</div>
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: travelStore.selectContent[14] }" value="14" @click="travelStore.contentSelect(14)">문화시설⛲</div>
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: travelStore.selectContent[15] }" value="15" @click="travelStore.contentSelect(15)">축제공연행사🎆</div>
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: travelStore.selectContent[25] }" value="25" @click="travelStore.contentSelect(25)">여행코스🏖</div>
    
</div>
<div class="row contentType mb-3 pb-3 bm-hanna-pro gap-2 justify-content-between" style="border-radius: 20px; font-size: 1vmax;" >
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: travelStore.selectContent[28] }" value="28" @click="travelStore.contentSelect(28)">레포츠🏄</div>
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: travelStore.selectContent[32] }" value="32" @click="travelStore.contentSelect(32)">숙박🏠</div>
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: travelStore.selectContent[38] }" value="38" @click="travelStore.contentSelect(38)">쇼핑🛍</div>
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: travelStore.selectContent[39] }" value="39" @click="travelStore.contentSelect(39)">음식점🍖</div>
</div>
    <button onclick="#" type="button" class="btn btn-primary rounded-pill col md-4" @click="travelStore.searchTravel()">검색</button>
       </div>
    </div>

    <KakaoMap></KakaoMap>
    
</template>

<style scoped>
    .contents-items{
        height: 2vmax;
        border: black solid 1px;
        border-radius: 25%;
    }
    .selected {
      background-color: black;
      color: white;
    }
</style>

