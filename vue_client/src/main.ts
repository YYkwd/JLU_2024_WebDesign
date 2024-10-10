import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')

