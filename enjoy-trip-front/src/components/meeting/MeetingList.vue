<template>
    <div class="container-fluid blog my-3">
        <a href="#" class="kakao-regular btn btn-primary bottom-blank" @click="moveWrite()"><i class="bx me-1"></i>모집하기</a>
        <div class="row g-4 justify-content-center">
            <MeetingListItem v-for="(meeting, index) in meetingStore.meetingList" 
            :key="index" :meeting="meeting"  :data-num="index + 1"/> 
        </div>
    </div>
    <InfiniteLoading @infinite="infiniteHandler" />
</template>

<script setup>
import MeetingListItem from './content/MeetingListItem.vue'
import { useRouter } from 'vue-router'
import InfiniteLoading from 'vue-infinite-loading';
import { ref, onMounted } from 'vue';
import {useMeetingStoreVer1} from '@/stores/meetingStoreVer1'
import { storeToRefs } from 'pinia'

const router = useRouter()
const meetingStore = useMeetingStoreVer1();

const moveWrite = () => {
    router.push({ name: 'meeting-write' })
    meetingStore.infiniteHandler
}

    const infiniteHandler = async ($state) => {
        const hasMore = await meetingStore.loadItems();
        console.log(meetingStore.meetingList)
        if (hasMore) {
           
        $state.loaded();
        
        } else {
        $state.complete();
      }
};


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
