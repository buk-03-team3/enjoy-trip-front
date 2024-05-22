<template>
    <div class="container py-5">
        <div class="mx-auto text-center mb-5" style="max-width: 900px">
            <h5 class="section-title px-3 kakao-bold">Hot Attraction</h5>
            <h1 class="mb-4 kakao-bold">🚀 인기 관광지 🚀</h1>
            <p class="mb-0 kakao-regular">이번 주 가장 많은 조회 관심 기록</p>
        </div>

        <div class="tab-class text-center">
            <div class="tab-content">
                <div id="NationalTab-1" class="tab-pane fade show p-0 active">
                    <div class="row g-4">
                        <div class="col-md-6 col-lg-4" v-for="(attraction, index) in hotAttractionList" :key="attraction.attractionId">
                            <div class="national-item">
                                <img :src="attraction.firstImage" class="img-fluid w-100 rounded" alt="Image" />
                                <div class="national-content">
                                    <div class="national-info">
                                        <h5 class="text-white text-uppercase mb-2">{{ index + 1 }}위</h5>
                                        <router-link :to="`/map`" class="btn-hover text-white">지도에서 확인하기</router-link>
                                    </div>
                                </div>
                                <div class="national-plus-icon">
                                    <a href="#" class="my-auto"><i class="fas fa-link fa-2x text-white"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useLandingStore } from '@/stores/landingStore.js'

const { landingStore, getTopThreeAttractionList } = useLandingStore()

const hotAttractionList = ref([])

onMounted(async () => {
    await getTopThreeAttractionList()
    hotAttractionList.value = landingStore.hotAttractionList
})
</script>

<style scoped>
.card-margin {
    margin-bottom: 1.875rem;
}
</style>
