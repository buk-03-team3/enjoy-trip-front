<script setup>
import { useTravelStore } from '@/stores/travelStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useAuthStore } from '@/stores/authStore'
import { ref, computed, watch, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

const travelStore = useTravelStore()
const { authStore } = useAuthStore()
const { favoriteStore, deleteFavorite, addFavorite, getFavoriteList } = useFavoriteStore()
const route = useRoute()

const toggleFavorite = async (attractionId, attractionName) => {
    const isFavorite = favoriteStore.favoriteList.some((item) => item.attractionId === attractionId)
    const favoriteItem = favoriteStore.favoriteList.find((item) => item.attractionId === attractionId)
    if (favoriteItem) {
        await deleteFavorite(favoriteItem.favoritesId)
        getFavoriteList(authStore.userId)
    } else {
        await addFavorite(attractionId, attractionName, authStore.userId)
    }
}

const isFavorite = (attractionId) => {
    return favoriteStore.favoriteList.some((item) => item.attractionId === attractionId)
}

let positions = reactive([])

const search = async () => {
    //비동기적 데이터 로드 동안에 searchMap 함수가 호출되어 travelList가 업데이트 되지 않았을 수 있음.
    //async-await를 사용해서 방지
    travelStore.searchCategory = 'keyword'
    await travelStore.searchTravelKeyword()
    // searchMap(travelStore.travelList);
}

function initMap() {
        positions = travelStore.travelList
    if (positions == '') {
        return
    }

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }

    var map = new kakao.maps.Map(mapContainer, mapOption)

    var imageSrc = '@/assets/default-user.png', // 마커이미지의 주소입니다
        //C:\SSAFY\ssafy-final-project\enjoy-trip-front\enjoy-trip-front\src\assets\default-user.png
        imageSize = new kakao.maps.Size(24, 35), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(20, 35) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
    const bounds = new kakao.maps.LatLngBounds()
    positions.forEach(function (pos) {
        bounds.extend(new kakao.maps.LatLng(Number(pos.latitude), Number(pos.longitude)))
        // 마커를 생성합니다
        var latlng = new kakao.maps.LatLng(pos.latitude, pos.longitude)
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: latlng // 마커의 위치
        })

        var customOverlay = new kakao.maps.CustomOverlay({
            position: latlng,
            xAnchor: 0.5,
            yAnchor: 1.05
        })

        var content = document.createElement('div')
        content.className = 'overlaybox'

        var title = document.createElement('div')
        title.className = 'map-popup-title'

        var store = document.createElement('h3')
        store.className = 'popup-name'
        store.appendChild(document.createTextNode(pos.title))
        title.appendChild(store)
        content.appendChild(title)

        var location = document.createElement('span')
        location.className = 'store-location'
        location.appendChild(document.createTextNode(pos.addr1))
        location.appendChild(document.createTextNode(pos.addr2))
        content.appendChild(location)

        var image = document.createElement('img')
        image.className = 'image'
        image.src = pos.firstImage
        content.appendChild(image)

        var buttonContainer = document.createElement('div')
        buttonContainer.className = 'popup-buttons'

        var closeBtn = document.createElement('button')
        closeBtn.className = 'popup-button'
        closeBtn.appendChild(document.createTextNode('닫기'))
        closeBtn.onclick = function () {
            customOverlay.setMap(null)
        }

        buttonContainer.appendChild(closeBtn)
        content.appendChild(buttonContainer)

        kakao.maps.event.addListener(marker, 'click', function () {
            customOverlay.setMap(map)
        })

        customOverlay.setContent(content)
    })

    map.setBounds(bounds)
}

onMounted(() => {
    // getFavoriteList(authStore.userId)
    travelStore.travelList = '' 
    positions = '';
    travelStore.searchKeyword = route.query.searchWord == null ? ''  : route.query.searchWord
    travelStore.sidoObj = ''
    travelStore.gugunObj=''
    console.log('Search Word:', travelStore.searchKeyword)
    if (travelStore.searchKeyword != null && travelStore.searchKeyword != '') {
        search();
    }
    if (window.kakao && window.kakao.maps) {
        initMap()
    } else {
        const script = document.createElement('script')
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap)
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=fb64d91f34f7517d1b1304c3836fdd3c&libraries=services,clusterer,drawing'
        document.head.appendChild(script)
    }
})

watch(
    () => travelStore.travelList,
    (newValue, oldValue) => {
        console.log('변경')

        console.log(travelStore.searchCategory)
        if (travelStore.searchCategory == 'keyword') {
            // searchMap();
            initMap()
        } else {
            //  sidogugunSearchMap(travelStore.travelList);
            initMap()
            travelStore.regionOrContent()
        }

        getTotalPages()
        getMaxPage()
        currentPage.value = 1;

        // 속성 값이 변경될 때 실행되는 로직
    }
)

// 페이지네이션 관련 로직

const markersPerPage = 5
const maxButtonInPage = 5
let currentPage = ref(1)
let maxPage = ref(1)
let totalPages = ref(1)
const getMarkersForPage = (pageNumber) => {
    const startIndex = (pageNumber - 1) * markersPerPage
    const endIndex = startIndex + markersPerPage
    return positions.slice(startIndex, endIndex)
}
const getTotalPages = () => {
    console.log("getTotalPages",positions.length)
totalPages.value =   Math.ceil(positions.length / markersPerPage)
}

const getMaxPage = () => {
    console.log("getMaxPage", totalPages.value)
        console.log("getMaxPage",Math.ceil(positions.length / markersPerPage))
    maxPage.value =  Math.ceil(positions.length / markersPerPage)
}
    

const prevEvent = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1
    }
}

const nextEvent = () => {
    if (currentPage.value < maxPage.value) {
        currentPage.value += 1
    }
}

const getPageNumbers = () => {
    const totalButtons = Math.min(maxPage.value, maxButtonInPage)
    const half = Math.floor(totalButtons / 2)
    let start = Math.max(1, currentPage.value - half)
    let end = Math.min(maxPage.value, start + totalButtons - 1)

    if (end - start < totalButtons - 1) {
        start = Math.max(1, end - totalButtons + 1)
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
</script>

<template>
    <div class="d-flex mx-auto text-center mb-5 mt-5 gap-4" style="max-width: 900px; width: fit-content;">
        <input type="text" class="form-control kakao-bold"style="width: 18vmax; height: max-content; text-align: center" v-model="travelStore.searchKeyword" placeholder="검색어를 입력하세요" />
                <button @click="search" class="form-control btn kakao-bold" style="background-color: #fee500; color: black; border-color: #fee500; width:6vmax">검색</button>
    </div>

    <div class="" >
        
    </div>
    <div class="result-container mx-auto" style="position: relative">
        <div class="search-result-container" style="position: absolute">
            <div id="map" class="d-flex" style="width: 90vmax; height: 35vmax"></div>
        </div>

        <div class="resultBox fiexd-size" style="position: absolute; " v-if="travelStore.travelList.length > 0">
            <h4 style="margin-top:0.8vmax;" class="bm-hanna-pro">검색 결과</h4>
            <hr style="margin: auto; border: none; border-bottom: 2px solid black"/>
            <ul id="searchResults" class="list-group">
                <li class="list-group-item py-3 mr-3 bm-hanna-air d-flex align-items-center" style="text-align:left; font-size: 0.9vmax;" v-for="(mapList, index) in getMarkersForPage(currentPage)" :key="index">
                    <!-- 이미지를 왼쪽에 배치 -->
                    <div>
                        <img src="../../assets/default-attraction.jpg" style="width: 100px; height: 50px; margin-right: 20px" v-if="mapList.firstImage == ''"/>
                        <img :src="mapList.firstImage" style="width: 100px; height: 50px; margin-right: 20px" v-else/>
                    </div>
                    <!-- 나머지 div들을 오른쪽에 배치 -->
                    <div class="ml-3">
                        <div>{{ mapList.title }}</div>
                        <div>{{ mapList.addr1 }}</div>
                        <!-- 좋아요 버튼 -->
                        <div>
                            <i
                                class="bi"
                                :class="[isFavorite(mapList.attractionId) ? 'bi-heart-fill text-danger heart-glow' : 'bi-heart text-danger heart-glow']"
                                @click="toggleFavorite(mapList.attractionId, mapList.title)"
                            ></i>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="container mt-3 mapNav" style="bottom: 0" v-if="travelStore.travelList.length > 0">
                <nav aria-label="Page navigation example">
                    <ul id="searchResults" class="list-group">
                        <li class="list-group-item py-3 mr-3 kakao-regular d-flex align-items-center" v-for="data in getMarkersForPage()" :key="data">{{ data }}</li>
                    </ul>
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="prevEvent">Previous</a>
                        </li>
                        <li class="page-item" v-for="page in getPageNumbers()" :key="page" :class="{ active: page === currentPage }">
                            <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === maxPage.value }">
                            <a class="page-link" href="#" @click.prevent="nextEvent">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 추가적인 스타일링은 여기에 */

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
    border: 2px solid black;
    height: 35vmax;
    width: 25vmax;
    z-index: 3;
    overflow: auto;
    background-color: white;
    overflow: hidden;
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
    border-bottom: 1px;
}

.list-group-item.div {
    color: black;
}

#searchResults .list-group-item:hover {
    background-color: #222;
    color: white;
}

.wrap {
    position: absolute;
    left: 0;
    bottom: 40px;
    width: 288px;
    height: 132px;
    margin-left: -144px;
    text-align: left;
    overflow: hidden;
    font-size: 12px;
    font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
    line-height: 1.5;
}
.wrap * {
    padding: 0;
    margin: 0;
}
.wrap .info {
    width: 286px;
    height: 120px;
    border-radius: 5px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: white;
}
.wrap .info:nth-child(1) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
}
.info .title {
    padding: 5px 0 0 10px;
    height: 30px;
    background: white;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: bold;
}
.info .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #888;
    width: 17px;
    height: 17px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
}
.info .close:hover {
    cursor: pointer;
}
.info .body {
    position: relative;
    overflow: hidden;
}
.info .desc {
    position: relative;
    margin: 13px 0 0 90px;
    height: 75px;
}
.desc .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.desc .jibun {
    font-size: 11px;
    color: #888;
    margin-top: -2px;
}
.info .img {
    position: absolute;
    top: 6px;
    left: 5px;
    width: 73px;
    height: 71px;
    border: 1px solid #ddd;
    color: #888;
    overflow: hidden;
}
.info:after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
}
.info .link {
    color: #5085bb;
}
</style>

<style>
.overlaybox {
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 300px; /* 필요에 따라 조정 */
    overflow: auto;
}

.map-popup-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
}

.popup-name {
    margin: 0;
}

.store-location {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
}

.image {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
}

.popup-buttons {
    text-align: right;
}

.popup-button {
    background-color: #f1f1f1;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.popup-button:hover {
    background-color: #ddd;
}

.fixed-size {
    text-overflow: ellipsis;
    white-space: nowrap; /* 말줄임표 사용을 위해 */
    overflow: hidden;
}

.heart-glow {
    filter: drop-shadow(0 0 6px rgba(255, 0, 0, 0.6)); /* 색 번짐 효과 */
}
</style>
