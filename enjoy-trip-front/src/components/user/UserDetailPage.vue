<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import http from '@/common/axios-config.js'

const { authStore } = useAuthStore()
const router = useRouter()

const home = () => {
    router.push('/')
}

const editUser = () => {
    // Edit user logic
}

const uploadProfileImage = async (files) => {
    const file = files[0]
    if (file) {
        const formData = new FormData()
        formData.append('profileImage', file)
        try {
            const response = await http.put(`/user/user-img-update/${5}`, formData, {
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

console.log(authStore.isDefault)
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
                                    <input type="text" class="kakao-regular form-control border-0 input-text-color" id="userName" placeholder="Your name" v-model="authStore.userName" />
                                    <label class="kakao-bold" for="userName">이름</label>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-floating">
                                    <input type="text" class="kakao-regular form-control border-0 input-text-color" id="userNickName" placeholder="Your NickName" v-model="authStore.userNickName" />
                                    <label class="kakao-bold" for="userNickName">별명</label>
                                </div>
                            </div>
                            <div class="col-md-lg-12">
                                <div class="form-floating">
                                    <input type="email" class="kakao-regular form-control border-0 input-text-color" id="email" placeholder="이메일" v-model="authStore.email" />
                                    <label class="kakao-bold" for="email">이메일</label>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-floating">
                                    <input type="password" class="kakao-regular form-control border-0 input-text-color" id="password" placeholder="Password" v-model="authStore.password" />
                                    <label class="kakao-bold" for="password">비밀번호</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-dark w-100 py-3" type="button" id="btnSignout" @click="editUser">수정</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-dark w-100 py-3" type="button" id="btnUpdate" @click="home">홈</button>
                            </div>
                        </div>
                    </form>
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
</style>
