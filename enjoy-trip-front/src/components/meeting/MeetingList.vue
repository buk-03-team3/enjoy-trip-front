<template>
    <div class="container-fluid blog my-3">
        <a href="#" class="kakao-regular btn btn-primary bottom-blank" @click="moveWrite()"><i class="bx me-1"></i>모집하기</a>
        <div class="row g-4 justify-content-center">
            <MeetingListItem v-for="(meeting, index) in meetings" :key="index" :meeting="meeting" />
        </div>
    </div>
</template>

<script setup>
import MeetingListItem from './content/MeetingListItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const moveWrite = () => {
    router.push({ name: 'meeting-write' })
}

const meetings = [
    {
        imageSrc: '../../../assets/img/blog-1.jpg',
        likes: '1.7K',
        comments: '1K',
        startDate: '2024년 05월 10일',
        endDate: '2024년 05월 17일',
        destination: '부산 해운대',
        destinationName: '부산'
    },
    {
        imageSrc: '../../../assets/img/blog-1.jpg',
        likes: '1.7K',
        comments: '1K',
        startDate: '2024년 05월 10일',
        endDate: '2024년 05월 17일',
        destination: '부산 해운대',
        destinationName: '부산'
    },
    {
        imageSrc: '../../../assets/img/blog-1.jpg',
        likes: '1.7K',
        comments: '1K',
        startDate: '2024년 05월 10일',
        endDate: '2024년 05월 17일',
        destination: '부산 해운대',
        destinationName: '부산'
    },
    {
        imageSrc: '../../../assets/img/blog-1.jpg',
        likes: '1.7K',
        comments: '1K',
        startDate: '2024년 05월 10일',
        endDate: '2024년 05월 17일',
        destination: '부산 해운대',
        destinationName: '부산'
    }
]
</script>

<style scoped>
.thumb-up-chat a {
    background-color: rgba(255, 255, 255, 0.5); /* 배경 색상과 투명도 조정 */
    backdrop-filter: blur(5px); /* 배경 흐림 효과 */
    color: rgba(0, 0, 0, 0.8); /* 글꼴 색상과 투명도 조정 */
}
.content {
    padding-top: 2vmax; /* NavBar height */
}

.bottom-blank {
    margin-bottom: 1.5vmax;
}
</style>
