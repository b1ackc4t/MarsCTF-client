import axios from 'axios'

const requests = axios.create({
    baseURL: "",
    timeout: 150000, // 请求超时时间
    withCredentials: true
})

export default requests
