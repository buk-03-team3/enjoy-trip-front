<script setup>
import { useAuthStore } from '@/stores/authStore'
import http from '@/common/axios-config.js'
const { authStore } = useAuthStore()
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div class="container-fluid contact bg-light py-5">
        <div class="container py-5">
            <div class="mx-auto text-center mb-5" style="max-width: 900px">
                <h5 class="section-title px-3">회원정보</h5>
                <h1 class="mb-0">회원정보 조회</h1>
            </div>
            <div class="row g-5 align-items-center">
                <div class="col">
                    <form id="updateForm">
                        <div class="row g-3">
                            <div class="col-lg-6">
                                <div class="form-floating">
                                    <input type="text" class="form-control border-0" id="userName" placeholder="Your name" value="${userDto.name}" />
                                    <label for="userName">{{ authStore.userName }}</label>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-floating">
                                    <input type="text" class="form-control border-0" id="userNickName" placeholder="Your NickName" v-bind="authStore.name" />
                                    <label for="userNickName">{{ authStore.userName }}</label>
                                </div>
                            </div>
                            <div class="col-md-lg-6">
                                <div class="form-floating">
                                    <input type="email" class="form-control border-0" id="email" placeholder="이메일" v-bind="authStore.email" />
                                    <label for="email">{{ authStore.email }}</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="password" class="form-control border-0" id="password" placeholder="Password" />
                                    <label for="password">{{ authStore.password }}</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="password" class="form-control border-0" id="password" placeholder="Password" />
                                    <label for="password">{{ authStore.userName }}</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-danger w-100 py-3" type="button" id="btnSignout">Sign out</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary w-100 py-3" type="button" id="btnUpdate">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
