<script setup></script>

<template>
    <div class="container text-center mt-3 content">
        <!-- <div class="container py-5"> -->
        <div class="mx-auto text-center mb-5" style="max-width: 900px">
            <h5 class="section-title px-3 kakao-bold">Notice</h5>
            <h1 class="mb-4 kakao-bold">공지사항</h1>
            <!-- <p class="mb-0 kakao-regular">여행 후기, 질문 글을 올려주세요.</p> -->
        </div>
        <router-view></router-view>
    </div>
</template>

<style>
mark.sky {
    background: le ear-gradient(to top, #54fff9 20%, transparent 30%);
}
.content {
    padding-top: 2vmax; /* NavBar height */
}
</style>
