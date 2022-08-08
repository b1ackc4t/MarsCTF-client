import axios from 'axios'
import {getToken} from '../utils/auth'
import { ElMessageBox } from 'element-plus'
import router from '../router'
import { whiteList } from '../utils/config'
import store from '../store';
import types from '../store/types';

// 是否显示重新登录
let isRelogin = { show: false };

const requests = axios.create({
    baseURL: "",
    timeout: 150000, // 请求超时时间
    withCredentials: true
})

// request拦截器
requests.interceptors.request.use(config => {
    if (getToken()) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    return Promise.reject(error)
})


// 响应拦截器
requests.interceptors.response.use(res => {
    return Promise.resolve(res)
}, error => {
    const code = error.request.status;
    if (whiteList.indexOf(router.currentRoute.value.path)  === -1 && code === 401) {
        if (isRelogin.show) {
            return Promise.reject(error)
        }
        isRelogin.show = true
        ElMessageBox.confirm('登录状态已过期，请重新登录', '系统提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            isRelogin.show = false
            return store.dispatch(types.LOGOUT)
        }).catch(() => {
            isRelogin.show = false
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        });
    } else {
        return Promise.reject(error)
    }
})

export default requests
