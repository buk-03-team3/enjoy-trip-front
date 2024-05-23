import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/landing/LandingPage.vue'
import TravelPage from '@/components/travel/TravelPage.vue'
import KakaoMap from '@/components/map/KakaoMap.vue'
import LoginPage from '@/components/user/LoginPage.vue'
import RegisterPage from '@/components/user/RegisterPage.vue'
import auth from '@/api/auth.js'


const routes = [
    {
        path: '/',
        name: 'index',
        component: LandingPage
    },
    {
        path: '/travel',
        name: 'travel',
        component: TravelPage
    },
    {
        path: '/user/info',
        name: 'user-info',
        component: () => import('@/components/user/UserDetailPage.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
    {
        path: '/meeting',
        name: 'meeting',
        component: () => import('@/views/TheMeetingView.vue'),
        redirect: { name: 'meeting-list' },
        children: [
            {
                path: 'list',
                name: 'meeting-list',
                component: () => import('@/components/meeting/MeetingList.vue')
            },
            {
                path: 'view',
                name: 'meeting-view',
                component: () => import('@/components/meeting/MeetingDetail.vue')
            },
            {
                path: 'write',
                name: 'meeting-write',
                component: () => import('@/components/meeting/MeetingWrite.vue')
            },
            {
                path: 'modify/:meetingId',
                name: 'meeting-modify',
                component: () => import('@/components/meeting/MeetingModify.vue')
            }
        ]
    },
    {
        path: '/community',
        name: 'community',
        component: () => import('@/views/TheCommunityView.vue'),
        redirect: { name: 'community-list' },
        children: [
            {
                path: 'list',
                name: 'community-list',
                component: () => import('@/components/community/CommunityList.vue')
            },
            {
                path: 'view/:communityId',
                name: 'community-view',
                component: () => import('@/components/community/CommunityDetail.vue')
            },
            {
                path: 'write',
                name: 'community-write',
                component: () => import('@/components/community/CommunityWrite.vue')
            },
            {
                path: 'modify/:communityId',
                name: 'community-modify',
                component: () => import('@/components/community/CommunityModify.vue')
            }
        ]
    },
    {
        path: '/map',
        name: 'map',
        component: KakaoMap
    },
    {
        path: '/notice',
        name: 'notice',
        component: () => import('@/views/TheBoardView.vue'),
        redirect: { name: 'article-list' },
        children: [
            {
                path: 'list',
                name: 'article-list',
                component: () => import('@/components/notice/BoardList.vue')
            },
            {
                path: 'view/:noticeId',
                name: 'article-view',
                component: () => import('@/components/notice/BoardDetail.vue')
            },
            {
                path: 'write',
                name: 'article-write',
                component: () => import('@/components/notice/BoardWrite.vue')
            },
            {
                path: 'modify/:noticeId',
                name: 'article-modify',
                component: () => import('@/components/notice/BoardModify.vue')
            }
        ]
    },
    {
        path: '/recommend',
        name: 'recommend',
        component: () => import('@/components/recommend/RecommendComponent.vue')
    },
    {
        path: '/meetingDetail',
        name: 'meeting-detail',
        component: () => import('@/components/meeting/MeetingDetail.vue'),
        children: [
            {
                path: 'list',
                name: 'participant-list',
                component: () => import('@/components/meeting/content/ParticipantsItem.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// 화이트리스트 정의
const whiteList = ['index', 'login', 'register', 'notice', 'article-list', 'article-view'];

router.beforeEach(async (to, from, next) => {
    if (whiteList.includes(to.name)) {
        next(); // 화이트리스트에 있는 경로는 인증 확인을 건너뜁니다.
    } else {
        const isAuthenticated = await auth();
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            alert("로그인 먼저 해주세요")
            next({ name: 'login' });
        } else {
            next();
        }
    }
});

export default router
