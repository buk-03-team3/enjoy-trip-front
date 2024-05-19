import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from './plugin/piniaPluginPersistedState'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedStatePlugin())

app.use(pinia)
app.use(router)

app.mount('#app')
