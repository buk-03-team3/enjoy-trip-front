<template>
    <div class="container py-5">
        <div class="mx-auto text-center mb-5" style="max-width: 900px">
            <h5 class="section-title px-3">SSAFY</h5>
            <h1 class="mb-4 kakao-bold">인기 관광지</h1>
            <p class="mb-0 kakao-regular">어쩌구저쩌구</p>
        </div>
        <div id="carouselExampleInterval" class="carousel slide dongle" data-bs-ride="carousel" style="border-radius: 30px; overflow: hidden">
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="5000">
                    <img src="../../../../assets/img/seoul2.jpg" class="d-block w-100" width="100%" height="50%" alt="..." />
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                    <img src="../../../../assets/img/busan_1.jpg" width="100%" height="50%" class="d-block w-90" alt="..." />
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                    <img src="../../../../assets/img/seoul1.jpg" class="d-block w-100" width="100%" height="50%" alt="..." />
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                    <img src="../../../../assets/img/trip2.jpg" class="d-block w-100" width="100%" height="50%" alt="..." />
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</template>
<script setup></script>
<style scope></style>
