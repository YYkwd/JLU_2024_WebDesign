import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'
import App from './App.vue'

import {createPinia} from 'pinia' //引入pinia

const app = createApp(App)
const pinia = createPinia()


app.use(ElementPlus)
app.use(router)
app.mount('#app')
app.use(pinia)

