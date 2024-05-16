<template>
  <div class="container-fluid position-relative p-0">
    <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
      <a href="" class="navbar-brand p-0">
        <h1 class="m-0 kakao-regular">
          <i><img src="../../assets/img/ssafy_logo.png" alt="Logo" width="125" height="125" /></i>Enjoy Trip
        </h1>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span class="fa fa-bars"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto py-0" v-if="!authStore.isLogin">
          <RouterLink to="/"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">홈</a></RouterLink>
          <RouterLink to="/auth"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">로그인</a></RouterLink>
          <RouterLink to="/auth"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">회원가입</a></RouterLink>
          <RouterLink to="/travel"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">관광지</a></RouterLink>
          <RouterLink to="/map"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">지도</a></RouterLink>
          <RouterLink to="/notice"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">공지사항</a></RouterLink>
          <RouterLink to="/community"><a href="blog.html" class="nav-item nav-link" style="font-size: 1.5rem">커뮤니티</a></RouterLink>
          <RouterLink to="/meeting"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">소모임</a></RouterLink>
        </div>
        <div class="navbar-nav ms-auto py-0" v-if="authStore.isLogin">
          <RouterLink to="/"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">홈</a></RouterLink>
          <RouterLink to="/travel"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">관광지</a></RouterLink>
          <RouterLink to="/map"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">지도</a></RouterLink>
          <RouterLink to="/notice"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">공지사항</a></RouterLink>
          <RouterLink to="/community"><a href="blog.html" class="nav-item nav-link" style="font-size: 1.5rem">커뮤니티</a></RouterLink>
          <RouterLink to="/meeting"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">소모임</a></RouterLink>
          <div id="navbarCollapse" class="nav-item dropdown collapse navbar-collapse">
            <a href="#" class="nav-link dropdown-toggle active" data-bs-toggle="dropdown">{{ authStore.userName }} 님</a>
            <div class="dropdown-menu m-0">
              <RouterLink to="/user/info"><a href="#" class="dropdown-item"><i class="fas fa-cog me-2"></i> 마이페이지</a></RouterLink>
              <a type="button" @click="logout" class="dropdown-item"><i class="fas fa-power-off me-2"></i> 로그아웃</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { RouterLink } from 'vue-router'

const { authStore, logout } = useAuthStore()
</script>
