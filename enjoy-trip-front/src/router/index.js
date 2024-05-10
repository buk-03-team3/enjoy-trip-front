import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/landing/LandingPage.vue'
import TravelPage from '@/components/travel/TravelPage.vue'
import AuthPage from '@/components/user/AuthPage.vue'
import UserInfoPage from '@/components/user/UserInfoPage.vue'
import MeetingPage from '@/components/meeting/MeetingPage.vue'

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
        }
    ]
})

export default router
