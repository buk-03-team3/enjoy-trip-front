import { reactive } from 'vue'
import { defineStore } from 'pinia'

import http from "@/common/axios-config.js";
import notLoginUserProfileImageUrl from '@/assets/default-user.png';

export const useAuthStore = defineStore('authStore', () => {
  console.log(notLoginUserProfileImageUrl)
  const authStore = reactive({
      // NavBar
      isLogin: sessionStorage.getItem('isLogin') === 'true',
      userName: sessionStorage.getItem('userName') != null ? sessionStorage.getItem('userName') : void 0,
      userProfileImageUrl: notLoginUserProfileImageUrl,

      // Login
      email: 'znight1020@naver.com',
      password: '1Q2w3e4r!'
  })

  // getter 는 생략 직접 사용하는 걸로
  const setLogin = (payload) => {
    sessionStorage.setItem("isLogin", "true");
    sessionStorage.setItem("userName", payload.userName);
    if(payload.userProfileImageUrl == null) {
      sessionStorage.setItem("userProfileImageUrl", "/enjoy-trip-front/assets/img/default.png");
    }
    sessionStorage.setItem("userProfileImageUrl", payload.userProfileImageUrl);

    authStore.isLogin = payload.isLogin;
    authStore.userName = payload.userName;
    if(payload.userProfileImageUrl == null) {
      authStore.userProfileImageUrl = "/enjoy-trip-front/assets/img/default.png";
    }
    authStore.userProfileImageUrl = payload.userProfileImageUrl;
    console.log(authStore)
  }

  const logout = async () => {
    try {
       let { data } = await http.get('/auth/logout')
       console.log(data)
       if (data.result == "success") {
        setLogout()
       }
    } catch (error) {
       console.error(error);
    }
  }

  const setLogout = () => {
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userProfileImageUrl");

    authStore.isLogin = false;
    authStore.userName = '';
    authStore.userProfileImageUrl = notLoginUserProfileImageUrl;
  }

  return { authStore, setLogin, setLogout, logout }
})
