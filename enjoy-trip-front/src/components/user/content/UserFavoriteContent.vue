<template>
  <div>
    <div class="col-lg-12 kakao-bold">나의 관심 여행지:</div>
    <div class="col-lg-12">
      <ul v-if="favoriteStore.favoriteList.length > 0">
        <li class="kakao-bold" v-for="favorite in favoriteStore.favoriteList" :key="favorite.id">
          {{ favorite.attractionName }}
          <button class="btn btn-danger mb-2 " @click="deleteFavorite(favorite.favoritesId)">x</button>
        </li>
      </ul>
      <p v-else>즐겨찾기 내역이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useAuthStore } from '@/stores/authStore'
import { onMounted } from 'vue';

const { authStore } = useAuthStore()
const { favoriteStore, getFavoriteList, deleteFavorite } = useFavoriteStore()

onMounted(() => {
  getFavoriteList(authStore.userId)
})
</script>
