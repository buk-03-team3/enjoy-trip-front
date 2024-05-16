<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps'
import { ref, computed } from 'vue'

const markersPerPage = 5
let currentPage = ref(1)

const map = ref()
const markerList = ref([])
const searchKeyword = ref('역삼역 맛집')

const search = () => {
    const ps = new kakao.maps.services.Places()
    markerList.value = []
    ps.keywordSearch(searchKeyword.value, placesSearchCB)
}

const onLoadKakaoMap = (mapRef) => {
    map.value = mapRef
    const ps = new kakao.maps.services.Places()
    ps.keywordSearch(searchKeyword, placesSearchCB)
}

const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds()
        for (let marker of data) {
            const markerItem = {
                lat: marker.y,
                lng: marker.x,
                infoWindow: {
                    content: marker.place_name,
                    visible: false
                }
            }
            markerList.value.push(markerItem)
            bounds.extend(new kakao.maps.LatLng(Number(marker.y), Number(marker.x)))
        }
        map.value?.setBounds(bounds)
    }
}

const onClickMapMarker = (markerItem) => {
    if (markerItem.infoWindow?.visible !== null && markerItem.infoWindow?.visible !== undefined) {
        markerItem.infoWindow.visible = !markerItem.infoWindow.visible
    } else {
        markerItem.infoWindow.visible = true
    }
}

const totalPages = computed(() => Math.ceil(markerList.value.length / markersPerPage))

const getMarkersForPage = (pageNumber) => {
    const startIndex = (pageNumber - 1) * markersPerPage
    const endIndex = startIndex + markersPerPage
    return markerList.value.slice(startIndex, endIndex)
}
</script>

<template>
    <div class="mx-auto text-center mb-5" style="max-width: 900px">
        <h5 class="section-title px-3 kakao-bold">MAP</h5>
        <h1 class="mb-4 kakao-bold">카카오 Map</h1>
    </div>

        <div class="container mt-3" style="width: fit-content">
        <div class="search-container mb-4">
            <div class="input-group" style="width:25%" >
                <input type="text" class="form-control kakao-bold" v-model="searchKeyword" placeholder="검색어를 입력하세요" />
                <button @click="search" class="btn kakao-bold" style="background-color: #FEE500; color:black; border-color: #FEE500">검색</button>
            </div>
        </div>
    </div>
    <div class="result-container container"  style="position:relative;">

        <div class="search-result-container"  style="position:absolute;">
            <KakaoMap :lat="37.566826" :lng="126.9786567" :level="1" @onLoadKakaoMap="onLoadKakaoMap" class="kakao-map-size" width="90vmax" height="40vmax" >
                <KakaoMapMarker
                    v-for="(marker, index) in getMarkersForPage(currentPage)"
                    :key="marker.key === undefined ? index : marker.key"
                    :lat="marker.lat"
                    :lng="marker.lng"
                    :infoWindow="marker.infoWindow"
                    :clickable="true"
                    @onClickKakaoMapMarker="onClickMapMarker(marker)"
                />
            </KakaoMap>
        </div>
        
    <div class="resultBox" style="position:absolute;" >

            <ul id="searchResults" class="list-group" >
                <li class="list-group-item py-3 kakao-regular" v-for="(mapList, index) in getMarkersForPage(currentPage)" v-bind:key="index">
                   <div>{{ mapList.lat }}</div>
                   <div>{{mapList.lng}}</div>
                   <div>{{mapList.infoWindow.content}}</div>
                </li>
            </ul>
         <div class="container mt-3 mapNav" style="bottom: 0;">
             <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="currentPage > 1 && (currentPage -= 1)">Previous</a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="currentPage < totalPages && (currentPage += 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
        </div>

    </div>


</template>

<style scoped>
/* 추가적인 스타일링은 여기에 */
body {
    background-color: #f8f9fa;
}

.kakao-map-size {
    width: 100%;
    height: 100%;
}
.search-result-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-container {
    justify-content: center;
    padding-top: 2vmax;
     width: 90vmax;
  
}

.result-container {
    justify-content: space-between;
    width: 90vmax;
    height: 40vmax;
}

.resultBox {
    height: 40vmax;
    max-width: 30%;
    z-index: 3;
    overflow: auto;
    background-color: white;
}
.resultBox .list-group{

}
#searchResults .list-group {
    left: -95%;
}
#searchResults .list-group-item {
    border: none;
    /* border-radius: 10px; */
    /*left: -95%; */
    cursor: pointer;
    transition: background-color 0.3s;
    border-bottom : 1px;
}

.list-group-item.div{
    color:black;
}

#searchResults .list-group-item:hover {
    background-color: #222;
    color: white;
}

</style>
