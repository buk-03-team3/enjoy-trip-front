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
                            <p class="uesrName">{{ meetingStore.meeting.userName}}</p>

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
                    <div class="mt-3" style="color: #222; font-size: 1.5vmax;" >함께 하는 사람들 {{partiCount }}/{{meetingStore.meeting.maxPeople }}</div>
                    <div class="divider mt-3 mb-3"></div>
                    <!--해당 모임에 참여 중인 인원들 -->
                    <div class="row">
                        <!-- 글 작성자 !! -->
                    <div class="card col-xl-4 col-md-4 col-sm-6 mb-4">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div>
                                    <img v-if="meetingStore.meeting.userProfileImageUrl != 'default'" :src="meetingStore.meeting.userProfileImageUrl" alt="image" class="avatar-md rounded-circle" />
                                    <img v-else src="@/assets/default-user.png" alt="User Profile Image" class="avatar-md rounded-circle" />
                                </div>
                                <div class="flex-1 ms-3">
                                    <h5 class="font-size-16 mb-1 t-left" style="padding-top: 0.5vmax">
                                        <p class="text-dark kakao-regular" style="margin-left: 5px; margin-bottom: 0; border-bottom: 1px solid; border-top: 1px solid; width: fit-content">{{ meetingStore.meeting.userName }}</p>
                                    </h5>
                                    <span class="">&nbsp;모임장</span>
                                    &nbsp;
                                    <span class="badge-restaurant badge mb-0 t-left" >MASTER</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        <!-- 참여자들 !!-->
                        <div  v-for="(participant, index) in meetingStore.participants" :key="index"  class="col-xl-4 col-md-4 col-sm-6 mb-4"> 
                        <ParticipantsItem :participant="participant" /> 
                    </div> 
                    </div>


                    <!-- 끝 -->
                    <div class="d-flex justify-content-end">
                        <button  v-if="editable() | meetingStore.meeting.sameUser " 
                        type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">수정</button>
                        <button  v-if="meetingStore.meeting.sameUser |  meetingStore.meeting.admin" type="button" class="btn btn-outline-danger mb-3 ms-1 ms-2" @click="ondeleteMeeting(meetingStore.meeting.meetingId)">삭제</button>
                        <button type="button" class="btn btn-outline-primary mb-3  ms-2" @click="moveList">목록</button>
                        <button  v-if="alreadyParticipants()" type="button" class="btn btn-outline-secondary mb-3 ms-2" @click="withdraw">탈퇴하기</button> 
                        <button v-if="!alreadyParticipants() & !meetingStore.meeting.sameUser &!isMax()" type="button" class="btn btn-outline-primary mb-3  ms-2" @click="join">참여하기</button>
                        <button type="button" class="btn btn-outline-warning mb-3  ms-2" v-if="isMax()">모집정원이 다 찼습니다.</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMeetingStoreVer1 } from '@/stores/meetingStoreVer1'
import ParticipantsItem from './content/ParticipantsItem.vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import {useAuthStore} from '@/stores/authStore.js'
import { formatDate } from '../../api/util.js'

const meetingStore = useMeetingStoreVer1();
const router = useRouter()
const partiCount = ref('');
const {authStore} = useAuthStore();

function moveList() {
    router.push({ name: 'meeting-list' })
}

const ondeleteMeeting = (meetingId) => {
    meetingStore.deleteMeeting(meetingId);
    alert("모임이 삭제되었습니다.");
    moveList();
}

// 현재 인원을 알기 위함..
onMounted(() => {
    if(meetingStore.participants==null) return;
    partiCount.value = meetingStore.participants.length;


})

//로그인한 사용자가 해당 모임에 가입되어있는지 확인하고, 가입 되어있으면 "참여하기" 버튼을 숨김 
const alreadyParticipants = () => {
    if(meetingStore.participants==null) return false;
    if(meetingStore.participants.some(item=>item.userId == authStore.userId)){
        return true;
    }
    return false;
}

// 만약 지금 로그인한 사용자가 해당 소모임에 가입되어 있는 상태이면서, 권한이 WRTIE라면 글수정 할 수 있음 
const editable= () =>{
    console.log(meetingStore.participants)
    if(meetingStore.participants==null || meetingStore.participants.length==0) return false;
  const user =meetingStore.participants.find(item => item.userId==authStore.userId);
    if(user==null) return false;
  if(user.authority=='WRITE') return true;
}

//소모임에 가입하기

const join =  async() => {
    meetingStore.joinMeeting(authStore.userId);
    moveList();
}

// 소모임 소속 참여자 수가 최대 인원에 달했을 때 
const isMax = () =>{
    if(partiCount.value >= meetingStore.meeting.maxPeople){
        console.log(partiCount.value);
        return true;
    }
    return false;
}

//소모임 탈퇴하기
const withdraw = () => {
    console.log(meetingStore.meeting)
}
</script>

<style scoped>
.avatar-md {
    height: 4rem;
    width: 4vmax;
}

.rounded-circle {
    border-radius: 50% !important;
}

a {
    text-decoration: none;
}

.subject-text {
    font-size: 1.5vmax;
    text-align: left;
}

.t-left {
    text-align: left;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #eff0f2;
    border-radius: 1rem;
}

.avatar-md {
    height: 4rem;
    width: 4vmax;
}

.rounded-circle {
    border-radius: 50% !important;
}

.img-thumbnail {
    padding: 0.25rem;
    background-color: #f1f3f7;
    border: 1px solid #eff0f2;
    border-radius: 0.75rem;
}

.avatar-title {
    align-items: center;
    background-color: #3b76e1;
    color: #fff;
    display: flex;
    font-weight: 500;
    height: 100%;
    justify-content: center;
    width: 100%;
}

.bg-soft-primary {
    background-color: rgba(59, 118, 225, 0.25) !important;
}

a {
    text-decoration: none !important;
}

.badge-soft-danger {
    color: #f56e6e !important;
    background-color: rgba(245, 110, 110, 0.1);
}

.badge-soft-success {
    color: #48ad59 !important;
    background-color: rgba(99, 173, 111, 0.1);
}

.badge-travel-review {
    color: #a79e4e; /* 더 진한 분홍 */
    background-color: #ffebb7;
}

.badge-travel-tip {
    color: #704a00; /* 더 진한 노랑 */
    background-color: #fdcbd7;
}

.badge-restaurant {
    color: #004d99; /* 더 진한 파랑 */
    background-color: #b5daff;
    border-radius: 20%;
}

.badge-question {
    color: #228b22; /* 더 진한 초록 */
    background-color: #d0e8d8;
        border-radius: 20%;
}

.badge-others {
    color: #8e15ac; /* 보라 */
    background-color: #d2baff;

}

.mb-0 {
    margin-bottom: 0 !important;
}

.badge {
    display: inline-block;
    padding: 0.25em 0.6em;
    font-size: 75%;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border: solid;
    border-width: medium;
 border-radius: 25%;
}
</style>