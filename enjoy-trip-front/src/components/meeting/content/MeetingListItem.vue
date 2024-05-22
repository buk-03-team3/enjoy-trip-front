<script setup>
import { useMeetingStoreVer1 } from '@/stores/meetingStoreVer1'
import { useRouter } from 'vue-router'
const meetingStore = useMeetingStoreVer1(); 
const router = useRouter()

defineProps({
    meeting: {
        type: Object,
        required: true
    }
});

function formatDate(dateString) {
    console.log(dateString)
    const date = new Date(dateString)
    const year = String(date.getFullYear()).slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}년 ${month}월 ${day}일`
}

const getDetail = async (meetingId) => {

    await meetingStore.getDetail(meetingId)
    // console.log(meetingStore.getDetail(meetingId));
    console.log(meetingStore.meeting, 'meeting')
    await router.push({ name: 'meeting-view' })
}

</script>

<template>
    <div class="col-lg-3 col-md-6" @click="getDetail(meeting.meetingId)">
        <div class="blog-item">
            <div class="blog-img">
                <div class="blog-img-inner">
                    <img class="img-fluid w-100 rounded-top" :src="meeting.firstImage" alt="Image" />
                    <div class="blog-icon">
                        <a href="#" class="my-auto"><i class="fas fa-link fa-2x text-white"></i></a>
                    </div>
                </div>
                <div class="blog-info d-flex align-items-center border border-start-0 border-end-0 thumb-up-chat">
                    <a href="#" class="btn-hover flex-fill text-center text-white border-end py-2">
                        <i class="fa fa-thumbs-up text-primary me-2"></i> ??
                    </a>
                    <a href="#" class="btn-hover flex-fill text-center text-white py-2">
                        <i class="fa fa-comments text-primary me-2"></i>{{ meeting.userName }}
                    </a>
                </div>
            </div>
            <div class="blog-content border border-top-0 rounded-bottom p-4">
                <small class="flex-fill text-center py-2">
                    <i class="fa fa-calendar-alt text-primary me-2"></i>출발일: {{ formatDate(meeting.meetingStartDate) }}
                </small>
                <br />
                <small class="flex-fill text-center py-2">
                    <i class="fa fa-calendar-alt text-primary me-2"></i>종료일: {{ formatDate(meeting.meetingEndDate) }}
                </small>
                <br />
                <small class="flex-fill text-center py-2">
                    <i class="fa fa-calendar-alt text-primary me-2"></i>목적지: {{ meeting.addr1 }}
                </small>
                <br />
                <hr />
                <a href="#" class="h4 kakao-regular">{{ meeting.title }}</a>
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
