// src/stores/authStore.js

import { reactive } from 'vue'
import { defineStore } from 'pinia'
import http from '@/common/axios-config.js'
import notLoginUserProfileImageUrl from '@/assets/default-user.png'

export const useAuthStore = defineStore('authStore', () => {
    const authStore = reactive({
        // NavBar
        isLogin: false,
        userId: 0,
        name: '',
        userProfileImageUrl: notLoginUserProfileImageUrl,
        // Login
        email: '',
        password: '',
        sido: '',
        gugun: '',
        // profile image
        isDefault: false,
    })

    const setLogin = (payload) => {
        authStore.isLogin = true
        authStore.userId = payload.userId
        authStore.name = payload.name
        authStore.userProfileImageUrl = payload.userProfileImageUrl === 'default' ? '/enjoy-trip-front/assets/img/default.png' : payload.userProfileImageUrl
        authStore.sido = payload.sido
        authStore.gugun = payload.gugun
        authStore.isDefault = payload.userProfileImageUrl === 'default'
    }

    const setUpdate = (payload) => {
        console.log(payload)
        authStore.name = payload.name
        authStore.sido = payload.sido
        authStore.gugun = payload.gugun
    }

    const logout = async () => {
        try {
            let { data } = await http.get('/auth/logout')
            console.log(data)
            if (data.result === 'success') {
                setLogout()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const setLogout = () => {
        authStore.isLogin = false
        authStore.name = ''
        authStore.userProfileImageUrl = notLoginUserProfileImageUrl
        authStore.userId = 0
        authStore.email = ''
        authStore.password = ''
        authStore.sido = ''
        authStore.gugun = ''
        authStore.isDefault = false
    }

    return { authStore, setLogin, setLogout, logout, setUpdate }
})
