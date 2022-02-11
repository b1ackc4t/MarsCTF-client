import axios from 'axios'
import {server} from '@/api/config'
// 创建 axios 实例

const requests = axios.create({
    baseURL: server,
    timeout: 6000, // 请求超时时间
    withCredentials: true
})
requests.defaults.withCredentials = true;
export default requests
