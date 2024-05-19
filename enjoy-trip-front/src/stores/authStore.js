import { reactive } from 'vue'
import { defineStore } from 'pinia'

import http from '@/common/axios-config.js'
import notLoginUserProfileImageUrl from '@/assets/default-user.png'

export const useAuthStore = defineStore('authStore', () => {
    const authStore = reactive({
        // NavBar
        isLogin: sessionStorage.getItem('isLogin') === 'true',
        userName: sessionStorage.getItem('userName') != null ? sessionStorage.getItem('userName') : void 0,
        userProfileImageUrl: null,
        // Login
        email: 'znight1020@naver.com',
        password: '1Q2w3e4r!',
        // profile image
        isDefault: false
    })

    // getter 는 생략 직접 사용하는 걸로
    const setLogin = (payload) => {
        sessionStorage.setItem('isLogin', 'true')
        sessionStorage.setItem('userName', payload.userName)
        if (payload.userProfileImageUrl == 'default') {
            sessionStorage.setItem('userProfileImageUrl', '/enjoy-trip-front/assets/img/default.png')
        }
        sessionStorage.setItem('userProfileImageUrl', payload.userProfileImageUrl)
        console.log('session url : ' + sessionStorage.userProfileImageUrl)

        authStore.isLogin = payload.isLogin
        authStore.userName = payload.userName
        console.log('payload userurl: ' + payload.userProfileImageUrl)
        if (payload.userProfileImageUrl == 'default') {
            authStore.userProfileImageUrl = '/enjoy-trip-front/assets/img/default.png'
        }
        authStore.userProfileImageUrl = payload.userProfileImageUrl
        authStore.isDefault = sessionStorage.getItem('userProfileImageUrl') == 'default'
        console.log(authStore)
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
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('userProfileImageUrl')

        authStore.isLogin = false
        authStore.userName = ''
        authStore.userProfileImageUrl = notLoginUserProfileImageUrl
    }

    return { authStore, setLogin, setLogout, logout }
})
