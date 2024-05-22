<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useCommunityStore } from '@/stores/communityStore'
import { useRouter } from 'vue-router'
import { useTravelStore } from '@/stores/travelStore'
import http from '@/common/axios-config.js'
import { ref, onMounted, watch } from 'vue'
import UserFavoriteContent from './content/UserFavoriteContent.vue'
import CommunityListItem from '../community/item/CommunityListItem.vue'

const { authStore, setUpdate } = useAuthStore()
const { communityStore, getSpecificUserCommunity } = useCommunityStore()
const router = useRouter()
const isEditMode = ref(false)
const originalData = ref({}) // 수정하기 전의 데이터를 저장할 변수
const tempName = ref(authStore.name) // 이름 수정을 위한 임시 변수

const home = () => {
    router.push('/')
}

const editUser = () => {
    originalData.value = { ...authStore } // authStore의 복사본을 originalData에 저장
    isEditMode.value = true
}

const updateUser = async () => {
    try {
        const response = await http.put(`/user/${authStore.userId}`, {
            email: authStore.email,
            password: authStore.password,
            name: tempName.value, // 임시 변수로 이름을 업데이트
            userProfileImageUrl: authStore.userProfileImageUrl,
            sido: cityBtnText.value,
            gugun: townBtnText.value
        })
        if (response.data.result == 'success') {
            try {
                setUpdate({
                    name: tempName.value,
                    sido: cityBtnText.value,
                    gugun: townBtnText.value
                })
            } catch (error) {
                alert('authStore 업데이트 실패')
            }

            alert('수정사항이 반영되었습니다.')
            isEditMode.value = false
        } else {
            alert('사용자 정보 수정 실패')
        }
    } catch (error) {
        alert('사용자 정보 수정에 실패했습니다.')
    }
}

const activeTab = ref('myPosts')
const communityList = ref(communityStore.communityList)

const changeActiveTab = (value) => {
    activeTab.value = value
}

let cityBtnText = ref(authStore.sido)
let townBtnText = ref(authStore.gugun)

let isActiveCity = ref(false)
let isActiveTown = ref(false)

const cityActivechange = () => {
    isActiveCity.value = !isActiveCity.value
}
const townActivechange = () => {
    isActiveTown.value = !isActiveTown.value
}

const travelStore = useTravelStore()
const { getSidoList, getGugunList } = travelStore

// 시, 도 리스트 먼저 가져오기
onMounted(async () => {
    await getSpecificUserCommunity(authStore.userId)
    await getSidoList()
})

// 시, 도를 선택하면 해당 시, 도에 속한 구, 군 가져오기
watch(
    () => travelStore.sidoObj,
    async (newSido) => {
        if (newSido.sidoCode) {
            await getGugunList()
        }
    }
)

const selectCity = (sido) => {
    cityBtnText.value = sido.sidoName
    travelStore.sidoObj = sido
    townBtnText.value = '구, 군을 선택해주세요'
}

const selectTown = (gugun) => {
    townBtnText.value = gugun.gugunName
    travelStore.gugunObj = gugun
}

const cancelUpdate = () => {
    // 수정 취소 시 이전 데이터로 복원
    authStore.userId = originalData.value.userId
    tempName.value = originalData.value.name
    authStore.nickName = originalData.value.nickName
    authStore.email = originalData.value.email
    authStore.password = originalData.value.password
    authStore.userProfileImageUrl = originalData.value.userProfileImageUrl
    authStore.sido = originalData.value.sido
    authStore.gugun = originalData.value.gugun

    isEditMode.value = false
}

const uploadProfileImage = async (files) => {
    const file = files[0]
    if (file) {
        const formData = new FormData()
        formData.append('profileImage', file)

        // 이전 프로필 이미지 URL에서 파일 이름 부분 추출
        const urlWithoutProtocol = authStore.userProfileImageUrl.replace(/^https?:\/\//, '') // 프로토콜 제거
        const filename = urlWithoutProtocol.split('/').pop()
        formData.append('preProfileImageFilename', filename)

        try {
            const response = await http.put(`/user/user-img-update/${authStore.userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('File uploaded successfully:', response.data)
            authStore.userProfileImageUrl = response.data.updateImageUrl
            sessionStorage.setItem('userProfileImageUrl', response.data.updateImageUrl)
            window.location.reload()
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }
}
</script>

<template>
    <div class="container-fluid contact bg-light py-5">
        <div class="container py-5">
            <div class="content"></div>
            <div class="text-center mt-3 content">
                <div class="mx-auto text-center mb-5" style="max-width: 900px">
                    <h5 class="section-title px-3 kakao-bold">user detail</h5>
                    <h1 class="mb-4 kakao-bold">회원 정보</h1>
                </div>
            </div>
            <div class="row g-5 align-items-center">
                <!-- 왼쪽 컬럼: 프로필 이미지 -->
                <div class="col-lg-6 text-center">
                    <div class="profile-section">
                        <img :src="authStore.userProfileImageUrl" alt="User Profile Image" class="img-fluid rounded-circle" style="max-width: 300px" v-if="!authStore.isDefault" />
                        <img src="../../assets/default-user.png" alt="User Profile Image" class="img-fluid rounded-circle" style="max-width: 300px" v-if="authStore.isDefault" />
                    </div>
                    <div class="profile-section">
                        <input type="file" id="upload-image" style="display: none" @change="uploadProfileImage($event.target.files)" />
                        <label for="upload-image"><p class="btn mt-3" style="background-color: #666; color: white">프로필 사진 수정하기</p></label>
                    </div>
                </div>
                <!-- 오른쪽 컬럼: 사용자 정보 폼 -->
                <div class="col-lg-6">
                    <form id="updateForm">
                        <div class="row g-3">
                            <div class="col-lg-12">
                                <div class="form-floating">
                                    <input type="text" class="kakao-regular form-control border-0 input-text-color" id="name" placeholder="Your name" v-model="tempName" :disabled="!isEditMode" />
                                    <label class="kakao-bold" for="name">이름</label>
                                </div>
                            </div>
                            <div class="col-md-lg-12">
                                <div class="form-floating">
                                    <input type="email" class="kakao-regular form-control border-0 input-text-color" id="email" placeholder="이메일" v-model="authStore.email" disabled />
                                    <label class="kakao-bold" for="email">이메일</label>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-floating">
                                    <input
                                        type="password"
                                        class="kakao-regular form-control border-0 input-text-color"
                                        id="password"
                                        placeholder="Password"
                                        v-model="authStore.password"
                                        :disabled="!isEditMode"
                                    />
                                    <label class="kakao-bold" for="password">비밀번호</label>
                                </div>
                            </div>
                            <div style="display: flex; gap: 3vmax">
                                <div>
                                    <p class="kakao-regular sign-form-text-optional">시, 도</p>
                                    <div class="select-menu" :class="isActiveCity ? 'active' : 'default'" @click="cityActivechange">
                                        <button type="button" id="select-btn" class="select-btn" :disabled="!isEditMode">
                                            <span class="cityBtnText">{{ cityBtnText }}</span>
                                            <i class="bx bx-chevron-down"></i>
                                        </button>

                                        <ul class="options" v-if="isActiveCity">
                                            <li class="option" v-for="sido in travelStore.sidoList" :key="sido.sidoCode" @click="selectCity(sido)">
                                                <span class="option-text">{{ sido.sidoName }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <p class="kakao-regular sign-form-text-optional">구, 군</p>
                                    <div class="select-menu" :class="isActiveTown ? 'active' : 'default'" @click="townActivechange">
                                        <button type="button" class="select-btn" :disabled="!isEditMode">
                                            <span class="townBtnText">{{ townBtnText }}</span>
                                            <i class="bx bx-chevron-down"></i>
                                        </button>

                                        <ul class="options" v-if="isActiveTown">
                                            <li class="option" v-for="gugun in travelStore.gugunList" :key="gugun.gugunCode" @click="selectTown(gugun)">
                                                <span class="option-text">{{ gugun.gugunName }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <button v-if="!isEditMode" class="btn btn-dark w-100 py-3" type="button" id="btnEdit" @click="editUser">수정</button>
                                <button v-else class="btn btn-dark w-100 py-3" type="button" id="btnUpdate" @click="updateUser">수정사항 반영</button>
                            </div>
                            <div class="col-6">
                                <button v-if="isEditMode" class="btn btn-dark w-100 py-3" type="button" id="btnCancel" @click="cancelUpdate">취소하기</button>
                                <button v-else class="btn btn-dark w-100 py-3" type="button" id="btnHome" @click="home">홈</button>
                            </div>
                            <UserFavoriteContent />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="container py-5">
            <!-- User Tab Section -->
            <ul class="nav nav-tabs" id="userTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="myPosts-tab" data-bs-toggle="tab" data-bs-target="#myPosts" type="button" role="tab" aria-controls="myPosts" aria-selected="true" @click="changeActiveTab('myPosts')">
                        내가 쓴 커뮤니티 글
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="myMeetings-tab" data-bs-toggle="tab" data-bs-target="#myMeetings" type="button" role="tab" aria-controls="myMeetings" aria-selected="false">
                        내가 모집하는 소모임
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="myParticipatedMeetings-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#myParticipatedMeetings"
                        type="button"
                        role="tab"
                        aria-controls="myParticipatedMeetings"
                        aria-selected="false"
                    >
                        내가 참여하는 소모임
                    </button>
                </li>
            </ul>

            <!-- Tab Content -->
            <div class="tab-content" id="userTabContent">
                <!-- My Posts Tab -->
                <div class="tab-pane fade show active post-section" id="myPosts" role="tabpanel" aria-labelledby="myPosts-tab" v-show="activeTab === 'myPosts'">
                    <!-- My Posts Content -->
                    <div class="row">
                        <div class="col-xl-4 col-sm-6 mb-4" v-for="community in communityStore.communityList" :key="community.communityId">
                            <CommunityListItem :community="community" />
                        </div>
                    </div>
                </div>

                <!-- My Meetings Tab -->
                <div class="tab-pane fade post-section" id="myMeetings" role="tabpanel" aria-labelledby="myMeetings-tab">
                    <!-- My Meetings Content -->
                </div>

                <!-- My Participated Meetings Tab -->
                <div class="tab-pane fade post-section" id="myParticipatedMeetings" role="tabpanel" aria-labelledby="myParticipatedMeetings-tab">
                    <!-- My Participated Meetings Content -->
                </div>
            </div>
        </div>
    </div>
</template>

<style>

.input-text-color {
    color: black;
}
.img-fluid {
    max-width: 100%;
    height: auto;
}
.rounded-circle {
    border-radius: 50%;
}
.profile-section {
    margin-bottom: 15px;
}
.post-section {
    margin-top: 1vmax;
}

.select-menu .select-btn {
    display: flex;
    height: 3rem;
    min-width: 15vmax;
    background: #fff;
    padding: 20px;
    font-size: 1vmax;
    font-weight: 400;
    border-radius: 8px;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.select-menu .options {
    position: absolute;
    width: 14vmax;
    overflow-y: auto;
    max-height: 12rem;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation-name: fadeInDown;
    -webkit-animation-name: fadeInDown;
    animation-duration: 0.35s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.35s;
    -webkit-animation-fill-mode: both;
}
.select-menu .options .option {
    display: flex;
    height: 3vmax;
    cursor: pointer;
    padding: 0 16px;
    border-radius: 8px;
    align-items: center;
    background: #fff;
}
.select-menu .options .option:hover {
    background: #f2f2f2;
}
.select-menu .options .option i {
    font-size: 1.4vmax;
    margin-right: 0.8vmax;
}
.select-menu .options .option .option-text {
    font-size: 1vmax;
    color: #333;
}

.select-btn i {
    font-size: 1.4vmax;
    transition: 0.3s;
}

.select-menu.active .select-btn i {
    border-color: green;
    transform: rotate(-180deg);
}
.select-menu.active .options {
    border-color: green;
    opacity: 0;
    z-index: 10;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-fill-mode: both;
}

@keyframes fadeInUp {
    from {
        transform: translate3d(0, 30px, 0);
    }
    to {
        border-color: green;
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
@keyframes fadeInDown {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        border-color: green;
        transform: translate3d(0, 20px, 0);
        opacity: 0;
    }
}
</style>
