<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps'
import {useTravelStore} from '@/stores/travelStore'
import { ref, computed, watch } from 'vue'

const travelStore = useTravelStore();

const markersPerPage = 5
let currentPage = ref(1)

const map = ref()
const markerList = ref([])

const search = async () =>{
    markerList.value = [];
    //비동기적 데이터 로드 동안에 searchMap 함수가 호출되어 travelList가 업데이트 되지 않았을 수 있음.
    //async-await를 사용해서 방지 
    travelStore.searchCategory = 'keyword';
    await travelStore.searchTravelKeyword(); 
    searchMap(travelStore.travelList);   
}

const onLoadKakaoMap = (mapRef) => {
    map.value = mapRef
}

const searchMap = async () => {
    const bounds = new kakao.maps.LatLngBounds()
     let data = await travelStore.travelList;
        for (let marker of data) {
            const markerItem = {
                lat: marker.latitude, //y
                lng: marker.longitude, //x
                addr1: marker.addr1,
                addr2: marker.addr2,
                firstImage: marker.firstImage,
                firstImage2 : marker.firstImage2,
                infoWindow: {
                    content: marker.title,
                    firstImage: marker.firstImage,
                    addr1: marker.addr1,
                    visible: false
                }
            }
            markerList.value.push(markerItem)
            bounds.extend(new kakao.maps.LatLng(Number(marker.latitude), Number(marker.longitude)))
        }
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.value?.setBounds(bounds)
}

const sidogugunSearchMap = async () => {
    travelStore.searchCategory = 'region';
        markerList.value = [];
        let data = await travelStore.travelList;
    console.log("=========",data)
        const bounds = new kakao.maps.LatLngBounds()
        for (let marker of data) {
            const markerItem = {
                lat: marker.latitude, //y
                lng: marker.longitude, //x
                addr1: marker.addr1,
                addr2: marker.addr2,
                firstImage: marker.firstImage,
                firstImage2 : marker.firstImage2,
                infoWindow: {
                    content: marker.title,
                    addr1: marker.addr1,
                    firstImage: marker.firstImage,
                    visible: false
                }
            }
            markerList.value.push(markerItem)
            bounds.extend(new kakao.maps.LatLng(Number(marker.latitude), Number(marker.longitude)))
        }
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.value?.setBounds(bounds)
        travelStore.regionOrContent();

    }


// // 키워드 검색 완료 시 호출되는 콜백함수 입니다
// const placesSearchCB = (data, status) => {
//     if (status === kakao.maps.services.Status.OK) {
//                 // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가합니다
//         const bounds = new kakao.maps.LatLngBounds()
//         for (let marker of data) {
//             const markerItem = {
//                 lat: marker.y,
//                 lng: marker.x,
//                 infoWindow: {
//                     content: marker.place_name,
//                     visible: false
//                 }
//             }
//             markerList.value.push(markerItem)
//             bounds.extend(new kakao.maps.LatLng(Number(marker.y), Number(marker.x)))
//         }
//                 // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//         map.value?.setBounds(bounds)
//     }
// }

    //마커 클릭 시 인포윈도우의 visible 값을 반전시킵니다
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

watch(
  () => travelStore.travelList,
    (newValue, oldValue) => {
        console.log("변경")
        console.log(travelStore.searchCategory)
        if (travelStore.searchCategory == 'keyword') { 
            searchMap();
        } else {
             sidogugunSearchMap(travelStore.travelList);
        }

    // 속성 값이 변경될 때 실행되는 로직
  }
);


</script>

<template>
    <div class="mx-auto text-center mb-5 mt-5" style="max-width: 900px">
        <h5 class="section-title px-3 kakao-bold">🎠</h5>
    </div>

        <div class="" style="width: fit-content">
        <div class="search-container mb-4">
            <div class="input-group" style="width:25%; margin-left: 8%;">
                <input type="text" class="form-control kakao-bold" v-model="travelStore.searchKeyword" placeholder="검색어를 입력하세요" />
                <button @click="search" class="btn kakao-bold" style="background-color: #FEE500; color:black; border-color: #FEE500">검색</button>
            </div>
        </div>
    </div>
    <div class="result-container"  style="position:relative; margin-left:5%" >
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
                <li class="list-group-item py-3 mr-3 kakao-regular d-flex align-items-center" v-for="(mapList, index) in getMarkersForPage(currentPage)" :key="index">
                    <!-- 이미지를 왼쪽에 배치 -->
                    <div>
                        <img :src="mapList.firstImage" style="width: 100px; height: 50px; margin-right:20px">
                    </div>
                    <!-- 나머지 div들을 오른쪽에 배치 -->
                    <div class="ml-3">
                        <div>{{ mapList.lat }}</div>
                        <div>{{ mapList.lng }}</div>
                        <div>{{ mapList.infoWindow.content }}</div>
                    </div>
                </li>
            </ul>
<div class="container mt-3 mapNav" style="bottom: 0;" v-if="travelStore.travelList.length > 0">
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

    .wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
    .wrap * {padding: 0;margin: 0;}
    .wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
    .wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
    .info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
    .info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
    .info .close:hover {cursor: pointer;}
    .info .body {position: relative;overflow: hidden;}
    .info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
    .desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
    .info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
    .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
    .info .link {color: #5085BB;}
</style>

