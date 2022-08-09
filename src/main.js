import {createApp} from 'vue'
import store from '@/store'
import App from './App.vue'
import router from './router/index.js'
import './assets/css/material-dashboard.min.css'
import 'element-plus/dist/index.css'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs
import hljs from 'highlight.js';
import axios from 'axios'
import requests from "@/axios";
VMdEditor.use(githubTheme, {
    Hljs: hljs,
});

function getServerConfig() {  // 定义
    axios.get('/config.json').then(res => {  // 请求上面描述的本地配置文件
        const app = createApp(App)
        const server = process.env.NODE_ENV !== 'development' ? res.data.BASE_URL_PROD : res.data.BASE_URL_DEV
        requests.defaults.baseURL = server
        app.provide('server', server)
        app.use(store).use(router).use(VMdEditor).mount('#app')
    })
}

getServerConfig()

