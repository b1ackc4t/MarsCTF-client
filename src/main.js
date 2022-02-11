import { createApp } from 'vue'
import store from '@/store'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/material-dashboard.min.css'
import './assets/css/googleicon.css'
createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
