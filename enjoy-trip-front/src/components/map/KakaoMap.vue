<template>
     <div>
    <div class="container mt-3">
      <div class="search-container mb-4">
        <div class="input-group">
          <input type="text" class="form-control" v-model="searchKeyword" placeholder="검색어를 입력하세요">
          <button @click="search" class="btn btn-primary">검색</button> 
        </div>
      </div>
    </div>
      
      <div class="result-container">
        <div class="container">
          <ul id="searchResults" class="list-group">
            <li class="list-group-item py-3" v-for="(mapList,index) in markerList" v-bind:key="index">
              {{ mapList.lat }} | {{mapList.lng }} | {{mapList.infoWindow.content  }}
            </li>
          </ul>
        </div>
  
        <div class="container">
          <KakaoMap :lat="37.566826" :lng="126.9786567" @onLoadKakaoMap="onLoadKakaoMap">
            <KakaoMapMarker
              v-for="(marker, index) in markerList"
              :key="marker.key === undefined ? index : marker.key"
              :lat="marker.lat"
              :lng="marker.lng"
              :infoWindow="marker.infoWindow"
              :clickable="true"
              @onClickKakaoMapMarker="onClickMapMarker(marker)"
            />
          </KakaoMap>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
  import { ref } from 'vue';
  
  const map = ref();
  const markerList = ref([]);
  const searchKeyword = ref('역삼역 맛집');
  
  const search = () => {
    const ps = new kakao.maps.services.Places();
    markerList.value= [];
    ps.keywordSearch(searchKeyword.value, placesSearchCB);  
  };
  
  const onLoadKakaoMap = (mapRef) => {
    map.value = mapRef;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, placesSearchCB);
  };
  
  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();
      for (let marker of data) {
        const markerItem = {
          lat: marker.y,
          lng: marker.x,
          infoWindow: {
            content: marker.place_name,
            visible: false
          }
        };
        markerList.value.push(markerItem);
        bounds.extend(new kakao.maps.LatLng(Number(marker.y), Number(marker.x)));
      }
      map.value?.setBounds(bounds);
    }
  };
  
  const onClickMapMarker = (markerItem) => {
    if (markerItem.infoWindow?.visible !== null && markerItem.infoWindow?.visible !== undefined) {
      markerItem.infoWindow.visible = !markerItem.infoWindow.visible;
    } else {
      markerItem.infoWindow.visible = true;
    }
  };
  </script>
  
  <style scoped>
  /* 추가적인 스타일링은 여기에 */
  body {
      background-color: #f8f9fa;
  }
  .search-container {
    display: flex;
    justify-content: center;
  }
  .result-container {
    display: flex;
    justify-content: space-between;
  }
  .container {
    max-width: 45%;
  }
  #searchResults .list-group-item {
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s;
  }
  #searchResults .list-group-item:hover {
      background-color: #f0f0f0;
  }
  </style>
  