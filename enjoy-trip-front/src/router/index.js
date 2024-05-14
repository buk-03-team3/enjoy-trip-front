import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/landing/LandingPage.vue'
import TravelPage from '@/components/travel/TravelPage.vue'
import AuthPage from '@/components/user/AuthPage.vue'
import UserInfoPage from '@/components/user/UserInfoPage.vue'
import MeetingPage from '@/components/meeting/MeetingPage.vue'
import CommunityPage from '@/components/community/CommunityPage.vue'
import KakaoMap from '@/components/map/KakaoMap.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
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
            path: '/auth',
            name: 'auth',
            component: AuthPage
        },
        {
            path: '/user/info',
            name: 'user-info',
            component: UserInfoPage
        },
        {
            path: '/meeting',
            name: 'meeting',
            component: MeetingPage
        },
        {
            path: '/community',
            name: 'community',
            component: CommunityPage
        },
        {
            path: '/map',
            name: 'map',
            component: KakaoMap
        },
        {
            path: '/notice',
            name: 'notice',
            // component: TheBoardView,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/TheBoardView.vue'),
            redirect: { name: 'article-list' },
            children: [
                {
                    path: 'list',
                    name: 'article-list',
                    component: () => import('@/components/notice/BoardList.vue')
                },
                {
                    path: 'view/:articleno',
                    name: 'article-view',
                    component: () => import('@/components/notice/BoardDetail.vue')
                },
                {
                    path: 'write',
                    name: 'article-write',
                    component: () => import('@/components/notice/BoardWrite.vue')
                },
                {
                    path: 'modify/:articleno',
                    name: 'article-modify',
                    component: () => import('@/components/notice/BoardModify.vue')
                }
            ]
        }
    ]
})

export default router
