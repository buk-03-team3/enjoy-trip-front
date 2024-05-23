<script setup>
import { useMeetingStoreVer1 } from '@/stores/meetingStoreVer1'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const meetingStore = useMeetingStoreVer1()
const router = useRouter()

defineProps({
    meeting: {
        type: Object,
        required: true
    },
    no: {
        type: Boolean,
        required: false
    },
    dataNum: {
        type: Number,
        required: true
    }
})

function formatDate(dateString) {
    const date = new Date(dateString)
    const year = String(date.getFullYear()).slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}년 ${month}월 ${day}일`
}

let auth = false

const getDetail = async (meetingId) => {
    await meetingStore.getDetail(meetingId)
    // console.log(meetingStore.getDetail(meetingId));
    if (meetingStore.meeting.meetingPassword == '' || meetingStore.meeting.meetingPassword == 'null' || meetingStore.meeting.meetingPassword == null) {
        auth = true
    }

    if (auth == true) {
        closeModal()
        await router.push({ name: 'meeting-view' })
    } else if (meetingStore.meeting.meetingPassword != null || meetingStore.meeting.meetingPassword != '') {
        openModal()
    } else {
        closeModal()
        await router.push({ name: 'meeting-view' })
    }
}

const getDetailAuth = async (meetingId) => {
    await meetingStore.getDetail(meetingId)
    await router.push({ name: 'meeting-view' })
}

const isModalOpen = ref(false)
const passwordInputValue = ref('')

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const checkPassword = () => {
    if (meetingStore.meeting.meetingPassword == passwordInputValue.value) {
        auth = true
        passwordInputValue.value = ''
        getDetailAuth(meetingStore.meeting.meetingId)
        closeModal()
    } else {
        alert('참여코드가 불일치 합니다.')
        closeModal()
    }
}
</script>

<template>
    <div class="col-lg-10 col-md-8" @click="getDetailAuth(meeting.meetingId)" v-if="no" style="color: black">
        <div class="blog-item">
            <div class="blog-img">
                <div class="blog-img-inner">
                    <img class="img-fluid w-100 rounded-top" :src="meeting.firstImage" alt="Image" v-if="meeting.firstImage != ''" />
                    <img class="img-fluid w-100 rounded-top" src="../../../assets/default-attraction.jpg" alt="Image" v-else />
                </div>
                <div class="blog-info d-flex align-items-center border border-start-0 border-end-0 thumb-up-chat">
                    <a href="#" class="btn-hover flex-fill text-center border-end py-2"> <i class="bi bi-people-fill"></i><div style="color: black">모집 인원: {{ meeting.maxPeople }}명 </div></a>
                    <a href="#" class="btn-hover flex-fill text-center py-2"> <i class="bi bi-person-circle"></i>{{ meeting.userName }} </a>
                </div>
            </div>

            <div class="blog-content border border-top-0 rounded-bottom p-4 bm-hanna-air">
                <small class="flex-fill text-center py-2"> <i class="fa fa-calendar-alt  me-2"></i>출발일: {{ formatDate(meeting.meetingStartDate) }} </small>
                <br />
                <small class="flex-fill text-center py-2"> <i class="fa fa-calendar-alt  me-2"></i>종료일: {{ formatDate(meeting.meetingEndDate) }} </small>
                <br />
                <small class="flex-fill text-center py-2"> <i class="fa fa-calendar-alt  me-2"></i>목적지: {{ meeting.addr1 }} </small>

                <br />
                <hr />
                <a href="#" class="h4 kakao-regular">{{ meeting.title }}</a>
            </div>
        </div>
    </div>

    <div class="col-lg-3 col-md-6" @click="getDetail(meeting.meetingId)" style="color: black">
        <div class="blog-item" style="color: black">
            <div class="blog-img" style="color: black">
                <div class="blog-img-inner" style="color: black">
                    <img class="img-fluid w-100 rounded-top" :src="meeting.firstImage" alt="Image" v-if="meeting.firstImage !== ''" />
                    <img class="img-fluid w-100 rounded-top" src="../../../assets/default-attraction.jpg" alt="Image" v-else />
                    
                    <div v-if="!meeting.meetingPassword == ''" class="blur-overlay">
                        <i class="bi bi-lock-fill lock-icon"></i>
                    </div>
                    <div v-if="!meeting.meetingPassword == null" class="blur-overlay">
                        <i class="bi bi-lock-fill lock-icon"></i>
                    </div>
                </div>
                <div class="blog-info d-flex align-items-center border border-start-0 border-end-0 thumb-up-chat" style="color: black">
                    <a href="#" class="btn-hover flex-fill text-center  border-end py-2" style="color: black"> <i class="bi bi-people-fill"></i>모집 인원: {{ meeting.maxPeople }}명 </a>
                    <a href="#" class="btn-hover flex-fill text-center  py-2" style="color: black"> <i class="bi bi-person-circle "></i>{{ meeting.userName }} </a>
                </div>
            </div>

            <div class="blog-content border border-top-0 rounded-bottom p-4 kakao-regular" style="text-align: left" >
                <small class="flex-fill text-center py-2"> <i class="fa fa-calendar-alt me-2"></i>출발일: {{ formatDate(meeting.meetingStartDate) }} </small>
                <br />
                <small class="flex-fill text-center py-2"> <i class="fa fa-calendar-alt me-2"></i>종료일: {{ formatDate(meeting.meetingEndDate) }} </small>
                <br />
                <small class="flex-fill text-center py-2"> <i class="bi bi-flag-fill"></i> &nbsp;목적지: {{ meeting.addr1 }} </small>
                <br />
                <div style="border-bottom: 1px solid black;"></div>
                <br >
                <a href="#" class="h4 kakao-regular">{{ meeting.title }}</a>
            </div>
        </div>
    </div>

    <div :class="['modal-container', { show: isModalOpen }]" @click="closeModal" v-if="!no">
        <div class="modal-window" @click.stop>
            <div class="card-container">
                <h2 class="kakao-bold" style="padding-bottom: 2vmax">비밀방 입장</h2>
                <div class="d-flex col-md-8">
                    <input type="password" class="col-md-8 form-control" v-model="passwordInputValue" placeholder="참여코드 입력" style="color: black" />
                    <div class="col-md-1"></div>
                    <button @click="checkPassword" class="col-md-4 btn kakao-bold" style="background-color: #fee500; color: black; border-color: #fee500">확인</button>
                </div>
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

.modal-container {
    z-index: -100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: visible;
    transition: 0.3s;
}

.modal-container.show {
    opacity: 1;
    visibility: visible;
    z-index: 100;
}

.modal-window {
    z-index: 100;
    position: relative;
    background: #ffffff;
    color: #000000;
    padding: 48px 40px;
    width: 350px;
    height: 200px;
    border-radius: 12px;
}

.blog-item {
    position: relative;
}

.blog-item:hover .blur-overlay {
    display: flex;
}

.blur-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
}

.lock-icon {
    font-size: 4rem;
    color: white;
}
</style>
