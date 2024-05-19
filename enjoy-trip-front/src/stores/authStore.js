import { reactive } from 'vue'
import { defineStore } from 'pinia'

import http from '@/common/axios-config.js'
import notLoginUserProfileImageUrl from '@/assets/default-user.png'

export const useAuthStore = defineStore('authStore', () => {
    const authStore = reactive({
        // NavBar
        isLogin: sessionStorage.getItem('isLogin') === 'true',
        userId: 0,
        name: sessionStorage.getItem('name') != null ? sessionStorage.getItem('name') : void 0,
        userProfileImageUrl: sessionStorage.getItem('userProfileImageUrl'),
        // Login
        email: 'znight1020@naver.com',
        password: '1Q2w3e4r!',
        sido: '',
        gugun: '',
        // profile image
        isDefault: false
    })

    // getter 는 생략 직접 사용하는 걸로
    const setLogin = (payload) => {
        console.log('login: ' + payload)
        sessionStorage.setItem('isLogin', 'true')
        sessionStorage.setItem('name', payload.name)
        if (payload.userProfileImageUrl == 'default') {
            sessionStorage.setItem('userProfileImageUrl', '/enjoy-trip-front/assets/img/default.png')
        }
        sessionStorage.setItem('userProfileImageUrl', payload.userProfileImageUrl)

        authStore.userId = payload.userId
        authStore.isLogin = payload.isLogin
        authStore.name = payload.name

        if (payload.userProfileImageUrl == 'default') {
            authStore.userProfileImageUrl = '/enjoy-trip-front/assets/img/default.png'
        }
        authStore.userProfileImageUrl = payload.userProfileImageUrl
        authStore.sido = payload.sido
        authStore.gugun = payload.gugun
        authStore.isDefault = sessionStorage.getItem('userProfileImageUrl') == 'default'
    }

    const logout = async () => {
        try {
            let { data } = await http.get('/auth/logout')
            console.log(data)
            if (data.result == 'success') {
                setLogout()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const setLogout = () => {
        sessionStorage.removeItem('isLogin')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('userProfileImageUrl')

        authStore.isLogin = false
        authStore.name = ''
        authStore.userProfileImageUrl = notLoginUserProfileImageUrl
    }

    return { authStore, setLogin, setLogout, logout }
})
