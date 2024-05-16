<script setup>
defineProps({
    meeting: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="col-lg-3 col-md-6">
        <div class="blog-item">
            <div class="blog-img">
                <div class="blog-img-inner">
                    <img class="img-fluid w-100 rounded-top" :src="meeting.imageSrc" alt="Image" />
                    <div class="blog-icon">
                        <a href="#" class="my-auto"><i class="fas fa-link fa-2x text-white"></i></a>
                    </div>
                </div>
                <div class="blog-info d-flex align-items-center border border-start-0 border-end-0 thumb-up-chat">
                    <a href="#" class="btn-hover flex-fill text-center text-white border-end py-2">
                        <i class="fa fa-thumbs-up text-primary me-2"></i>{{ meeting.likes }}
                    </a>
                    <a href="#" class="btn-hover flex-fill text-center text-white py-2">
                        <i class="fa fa-comments text-primary me-2"></i>{{ meeting.comments }}
                    </a>
                </div>
            </div>
            <div class="blog-content border border-top-0 rounded-bottom p-4">
                <small class="flex-fill text-center border-end py-2">
                    <i class="fa fa-calendar-alt text-primary me-2"></i>출발일: {{ meeting.startDate }}
                </small>
                <br />
                <small class="flex-fill text-center border-end py-2">
                    <i class="fa fa-calendar-alt text-primary me-2"></i>종료일: {{ meeting.endDate }}
                </small>
                <br />
                <small class="flex-fill text-center border-end py-2">
                    <i class="fa fa-calendar-alt text-primary me-2"></i>목적지: {{ meeting.destination }}
                </small>
                <br />
                <hr />
                <a href="#" class="h4 kakao-regular">{{ meeting.destinationName }}</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.thumb-up-chat a {
    background-color: rgba(255, 255, 255, 0.5); /* 배경 색상과 투명도 조정 */
    backdrop-filter: blur(5px); /* 배경 흐림 효과 */
    color: rgba(0, 0, 0, 0.8); /* 글꼴 색상과 투명도 조정 */
}
</style>
