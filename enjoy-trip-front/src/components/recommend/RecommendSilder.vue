<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '/assets/swiper/style.css'
import { Pagination, Navigation } from 'swiper/modules'
import { useRecommendStore } from '@/stores/recommendStore'
import { ref, computed, watch } from 'vue'
const recommendStore = useRecommendStore()
recommendStore.recommendWithUserAddr()
const modules = [Pagination, Navigation]
</script>

<template>
    <h1 class="mb-4 kakao-bold text-center">회원님과 가까운 여행지</h1>
    <div style="border-bottom: 2px solid grey; width:96%; margin-left: 2%"/>
    <swiper autoplay="delay: 500" ref="{swiperRef}" :slidesPerView="5" :centeredSlides="false" :spaceBetween="30" :pagination="false" :navigation="true" :modules="modules" class="mySwiper">
        <template v-for="(recommendElement, index) in recommendStore.recommendList" :key="index">
            <swiper-slide>
                <div style="display: flex; flex-direction: column; max-width: 400px;">
                    <img :src="recommendElement.firstImage" style="border-radius: 20%; max-width: 90%; object-fit: cover; margin-left:5%" />
                    <div class="kakao-regular" style="flex-grow: 1">
                        {{ recommendElement.title }}
                    </div>
                </div>
            </swiper-slide>
        </template>
    </swiper>

    <h1 class="mb-4 kakao-bold text-center">회원님이 관심있어 하는 여행지</h1>
    <div style="border-bottom: 2px solid grey; width:96%; margin-left: 2%"/>
    <swiper ref="{swiperRef}" :slidesPerView="5" :centeredSlides="false" :spaceBetween="30" :pagination="false" :navigation="true" :modules="modules" class="mySwiper">
        <template v-for="(recommendElement, index) in recommendStore.recommendListWithFavoriteAddr" :key="index">
            <swiper-slide>
                <div style="display: flex; flex-direction: column; max-width: 400px">
                    <img :src="recommendElement.firstImage" style="border-radius: 20%;max-width: 90%; object-fit: cover" />
                    <div class="kakao-regular" style="flex-grow: 1">
                        {{ recommendElement.title }}
                    </div>
                </div>
            </swiper-slide>
        </template>
    </swiper>
    
    <h1 class="mb-4 kakao-bold text-center">회원님이 좋아하는 컨텐츠</h1>
    <div style="border-bottom: 2px solid grey; width:96%; margin-left: 2%"/>
    <swiper ref="{swiperRef}" :slidesPerView="5" :centeredSlides="false" :spaceBetween="30" :pagination="false" :navigation="true" :modules="modules" class="mySwiper">
        <template v-for="(recommendElement, index) in recommendStore.recommendListWithFavoriteContent" :key="index">
            <swiper-slide>
                <div style="display: flex; flex-direction: column">
                    <img :src="recommendElement.firstImage" style="border-radius: 20%; max-height: 280px; object-fit: cover" />
                    <div class="kakao-regular" style="flex-grow: 1">
                        {{ recommendElement.title }}
                    </div>
                </div>
            </swiper-slide>
        </template>
    </swiper>
</template>
