<template>
    <!-- Header Start -->
    <!-- <div class="container-fluid bg-breadcrumb">
        <div class="container text-center py-5" style="max-width: 900px">
            <h3 class="text-white display-3 mb-4">소모임 페이지</h3>
            <ol class="breadcrumb justify-content-center mb-0"></ol>
        </div>
    </div> -->
    <!-- Header End -->

    <!-- Blog Start -->
    <div class="container-fluid blog container py-4">
        <!-- <div class="container py-5"> -->
        <div class="mx-auto text-center mb-5 content" style="max-width: 900px">
            <h5 class="section-title px-3 kakao-bold">meeting</h5>
            <h1 class="mb-4 kakao-bold">소모임</h1>
            <!-- <p class="mb-0 kakao-regular">여행 후기, 질문 글을 올려주세요.</p> -->
        </div>
        <div class="row g-4 justify-content-center">
            <MeetingListItem v-for="(meeting, index) in meetings" :key="index" :meeting="meeting" />
        </div>
    </div>
    <!-- Blog End -->
</template>

<script setup>
import MeetingListItem from './content/MeetingListItem.vue'

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
</style>
