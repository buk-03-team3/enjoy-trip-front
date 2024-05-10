<template>
    <!-- Navbar & Hero Start -->
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
                <div class="navbar-nav ms-auto py-0" v-show="!isLogin">
                    <RouterLink to="/"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">홈</a></RouterLink>
                    <RouterLink to="/auth"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">로그인</a> </RouterLink>
                    <RouterLink to="/auth"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">회원가입</a> </RouterLink>
                    <RouterLink to="/travel"> <a href="#" class="nav-item nav-link" style="font-size: 1.5rem">관광지</a> </RouterLink>
                    <a href="#" class="nav-item nav-link" style="font-size: 1.5rem">공지사항</a>
                    <a href="#" class="nav-item nav-link" style="font-size: 1.5rem">커뮤니티</a>
                    <RouterLink to="/meeting"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">소모임</a></RouterLink>
                </div>

                <div class="navbar-nav ms-auto py-0" v-show="isLogin">
                    <RouterLink to="/"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">홈</a></RouterLink>
                    <RouterLink to="/travel"> <a href="#" class="nav-item nav-link" style="font-size: 1.5rem">관광지</a> </RouterLink>
                    <a href="#" class="nav-item nav-link" style="font-size: 1.5rem">공지사항</a>
                    <a href="#" class="nav-item nav-link" style="font-size: 1.5rem">커뮤니티</a>
                    <RouterLink to="/meeting"><a href="#" class="nav-item nav-link" style="font-size: 1.5rem">소모임</a></RouterLink>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle active" data-bs-toggle="dropdown"> 이현수 님</a>
                            <div class="dropdown-menu m-0">
                                <RouterLink to="/user/info"
                                    ><a href="#" class="dropdown-item"><i class="fas fa-cog me-2"></i> 마이페이지</a></RouterLink
                                >
                                <a href="#/logout" class="dropdown-item"><i class="fas fa-power-off me-2"></i> 로그아웃</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!--
                                <div class="navbar-nav ms-auto py-0">
                <a href="index.jsp" class="nav-item nav-link <%=thisPage.equals("home") ? "active":"" %>">Home</a>
                <a href="regionTour.jsp" class="nav-item nav-link <%=thisPage.equals("regionTour") ? "active":"" %>">지역별 관광지</a>
                <a href="contentTour.jsp" class="nav-item nav-link <%=thisPage.equals("contentTour") ? "active":"" %>">컨텐츠별 관광지</a>
                <a href="notice.jsp" class="nav-item nav-link <%=thisPage.equals("notice") ? "active":"" %>">공지사항</a>
                <a href="community.jsp" class="nav-item nav-link <%=thisPage.equals("community") ? "active":"" %>">공유게시판</a>
                <%if(memberDto == null){ %>
                <a href="login.jsp" class="nav-item nav-link <%=thisPage.equals("login") ? "active":"" %>">Login</a>
                <a href="register.jsp" class="nav-item nav-link <%=thisPage.equals("register") ? "active":"" %>">Register</a>
                <% } else {%>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle active" data-bs-toggle="dropdown">${userDto.name} 님</a>
                    <div class="dropdown-menu m-0">
	                    <a href="profile.jsp" class="dropdown-item"><i class="fas fa-cog me-2"></i> Account Settings</a>
	                    <a href="<%=contextPath %>/logout" class="dropdown-item"><i class="fas fa-power-off me-2"></i> Log Out</a>
                    </div>
                </div>
                <% }%>
            </div>
                -->
            </div>
        </nav>
    </div>
    <!-- Navbar & Hero End -->
</template>

<style scope></style>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const isLogin = ref(true)
</script>
