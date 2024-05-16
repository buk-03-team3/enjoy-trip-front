<script setup>
import axios from '@/common/axios-config';
import { ref } from 'vue'
const sidoList = ref('시도');
const gugunList = ref('구군');
const sidoObj = ref('기본값');
const gugunObj = ref('기본값');
const travelList = ref();
const selectContent = ref({
    12: false,
    14: false,
    15: false,
    25: false,
    28: false,
    32: false,
    38: false,
    39: false
});

const contentSelect = (contentCode) => {
    if (selectContent.value[contentCode] == false) {
        selectContent.value[contentCode] = true;
    } else {
        selectContent.value[contentCode] = false;
    }
}
const getSidoList = async () => {
    try {
        await axios.get('/trip/sidoCode').then((response) => {
            
            let { data } = response //destructuring 문법.. responce에 data 객체만 빼서 할당받겠다.
            sidoList.value = data.sidoList;
            console.log(sidoList.value[1])
        })
    } catch (error) {
        console.log(error)
    }
}

const getGugunList = async () => {
	        let url = `/trip/gugunCode/`;
	        let urlParams = sidoObj.value;
            let urls = url + urlParams;
             try {
                await axios.get(urls).then((response) => {
            
            let { data } = response //destructuring 문법.. responce에 data 객체만 빼서 할당받겠다.
            gugunList.value = data.gugunList;
            console.log(gugunList)
        
        })
    } catch (error) {
        console.log(error)
    }
}

const searchTravelRegion = async () => {
    let url = `/travel/list?`;
    let urlParams = `sidoCode=` + sidoObj.value + `&gugunCode=` + gugunObj.value;
    // console.log(sidoObj.value + " " + gugunObj.value);
    try {
        await axios.get(url + urlParams).then((response) => {
        let { data } = response;
            travelList.value = data.list;
        })

    } catch (error) {
        console.log(error);
    }
}
getSidoList();
</script>
<template>
    <!-- Header End -->
    <div class="container-fluid search-bar position-relative" >
        <div class="container">
            <div class="position-relative rounded-pill align-items-center mx-auto p-3" style="background: rgba(19, 53, 123, 0.8)">
                <div class="row">
                    <div class="col md-4">
                        <select v-model="sidoObj" class="form-select btn btn-primary rounded-pill dropdown-togglecontentsButton" type="button" aria-expanded="false">
                            <option v-for="sido in sidoList" :value="sido.sidoCode" :key="sido.sidoCode">{{sido.sidoName}}</option>
                        </select>
                    </div>
                    <div class="col md-4">
                        <select id="gugunList" v-model="gugunObj" @click="getGugunList()" class="form-select btn btn-primary rounded-pill dropdown-toggle contentsButton" type="button" aria-expanded="false">
                            <option v-for="gugun in gugunList" :value="gugun.gugunCode" :key="gugun.gugunCode">{{gugun.gugunName}}</option>
                        </select>
                    </div>
                </div>
            </div>
<div class="row contentType" >
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: selectContent[12] }"  value="12" @click="contentSelect(12)">관광지</div>
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: selectContent[14] }" value="14" @click="contentSelect(14)">문화시설</div>
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: selectContent[15] }" value="15" @click="contentSelect(15)">축제공연행사</div>
    <div class="col-md-2 contents-items d-flex justify-content-center align-items-center" :class="{ selected: selectContent[25] }" value="25" @click="contentSelect(25)">여행코스</div>
    <div class="col-md-1 contents-items d-flex justify-content-center align-items-center" :class="{ selected: selectContent[28] }" value="28" @click="contentSelect(28)">레포츠</div>
    <div class="col-md-1 contents-items d-flex justify-content-center align-items-center" :class="{ selected: selectContent[32] }" value="32" @click="contentSelect(32)">숙박</div>
    <div class="col-md-1 contents-items d-flex justify-content-center align-items-center" :class="{ selected: selectContent[38] }" value="38" @click="contentSelect(38)">쇼핑</div>
    <div class="col-md-1 contents-items d-flex justify-content-center align-items-center" :class="{ selected: selectContent[39] }" value="39" @click="contentSelect(39)">음식점</div>
</div>

    <button onclick="#" type="button" class="btn btn-primary rounded-pill col md-4" @click="searchTravelRegion()">검색</button>
       </div>
    </div>
</template>

<style scoped>
    .contents-items{
        height: 80px;
        border: black solid 1px;
    }
    .selected {
      background-color: navy;
      color: white;
    }
</style>

