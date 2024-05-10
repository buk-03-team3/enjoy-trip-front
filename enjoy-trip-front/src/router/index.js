import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/landing/LandingPage.vue'
import TravelPage from '@/components/travel/TravelPage.vue'
import AuthPage from '@/components/user/AuthPage.vue'
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
            path: '/login',
            name: '/login',
            component: AuthPage
        }
    ]
})

export default router
