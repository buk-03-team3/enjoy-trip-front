import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { createPersistedStatePlugin } from './plugin/piniaPluginPersistedState'
import CKEditor from '@ckeditor/ckeditor5-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
// pinia.use(createPersistedStatePlugin())

app.use(pinia)
app.use(router)
app.use(CKEditor)
app.mount('#app')

export function formatDate(dateString) {
    const date = new Date(dateString)
    const year = String(date.getFullYear()).slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}년 ${month}월 ${day}일`
}
