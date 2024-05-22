<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10 text-start">
                <div class="row">
                    <div>
                        <div class="d-flex align-items-center">
                            <img
                                v-if="meetingStore.meeting.userProfileImageUrl !== 'default'"
                                :src="meetingStore.meeting.userProfileImageUrl"
                                alt="User Profile Image"
                                class="avatar-md rounded-circle"
                            />
                            <img v-else src="@/assets/default-user.png" alt="User Profile Image" class="avatar-md rounded-circle" />
                            <p class="uesrName">{{ meetingStore.meeting.uesrName }}</p>

                            <p class="ms-3 mb-0 bm-hanna-pro">
                                <span style="color: #222; font-size: 2vmax;">{{ meetingStore.meeting.title }}</span> <br />
                            </p>
                            <p class="ms-auto mb-0">
                                <span>{{ formatDate(meetingStore.meeting.regDate) }} 작성</span>
                                <br />
                                <!-- <span style="text-align: right">조회 : {{ communityStore.community.readCount }}</span> -->
                            </p>
                        </div>
                        <br />
                    </div>
                    <hr />
                    <!-- <div class="col-md-4 align-self-center text-end">댓글 : 17</div> -->
                    <div class="divider mb-3"></div>
                    <div style="color: #222; font-size: 1.2vmax; border: 1px solid; " class="bm-hanna-air" v-html="meetingStore.meeting.content"></div>
                    <div style="color: #222; font-size: 1.8vmax; border: 1px solid; " >목적지: {{meetingStore.meeting.addr1}}</div>
                    <div style="color: #222; font-size: 1.8vmax; border: 1px solid; " >기간: {{formatDate(meetingStore.meeting.meetingStartDate)}} 부터 {{ formatDate(meetingStore.meeting.meetingEndDate) }} 까지</div>
                    <div class="divider mt-3 mb-3"></div>
                    <div class="d-flex justify-content-end">
                        <button  v-if="meetingStore.meeting.sameUser" type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">수정</button>
                        <button  v-if="meetingStore.meeting.sameUser || meetingStore.meeting.admin" type="button" class="btn btn-outline-danger mb-3 ms-1 ms-2" @click="ondeleteMeeting(meetingStore.meeting.meetingId)">삭제</button>
                        <button type="button" class="btn btn-outline-primary mb-3  ms-2" @click="moveList">목록</button>
                        <button v-if="!meetingStore.meeting.sameUser ||alreadyParticipants() " type="button" class="btn btn-outline-primary mb-3  ms-2" @click="join">참여하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMeetingStoreVer1 } from '@/stores/meetingStoreVer1'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import {useAuthStore} from '@/stores/authStore.js'

import { formatDate } from '../../api/util.js'
const meetingStore = useMeetingStoreVer1();
const router = useRouter()
const partiCount = ref('');
const authStore = useAuthStore.authStore;

function moveList() {
    router.push({ name: 'meeting-list' })
}

const ondeleteMeeting = (meetingId) => {
    meetingStore.deleteMeeting(meetingId);
    alert("모임이 삭제되었습니다.");
    moveList();
}

onMounted(() => {
    partiCount.value = meetingStore.participants.length;
})

const alreadyParticipants = () => {
    for (let i = 0; i < meetingStore.participants.length; i++){
        if (meetingStore.participants[i] == authStore.userId) {
            return true;
        }
    }
    return false;
}
</script>