import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/landing/LandingPage.vue'
import TravelPage from '@/components/travel/TravelPage.vue'
import AuthPage from '@/components/user/AuthPage.vue'
import UserInfoPage from '@/components/user/UserInfoPage.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'LandingPage',
            component: LandingPage
        },
        {
            path: '/TravelPage',
            name: 'TravelPage',
            component: TravelPage
        },
        {
            path: '/auth',
            name: '/auth',
            component: AuthPage
        },
        {
            path: '/UserInfoPage',
            name: 'UserInfoPage',
            component: UserInfoPage
        }
    ]
})

export default router
