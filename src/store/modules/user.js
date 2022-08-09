import { getToken, removeToken, setToken } from "../../utils/auth"
import { login, getMe, logout } from "../../api/user"
import types from "../types"

const userStore = {
    // 用函数可以保证重用
    state: () => ({
        token: getToken(),
        user: null,
    }),
    actions: {
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then((res) => {
                    setToken(res.data.data, userInfo.remember)
                    commit(types.SET_USER_STATE, 'token', res.data.data)
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getMe().then(res => {
                    if (res.status === 200 && res.data.flag === true) {
                        const user = res.data.data
                        commit(types.SET_USER_STATE, {key: 'user', value: user})
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出登录
        logout() {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    removeToken()
                    window.location.href = "/"
                    resolve()
                }).catch((error) => {
                    reject(error)
                })
            })
            
        }
    },
    mutations: {
        setUserState(state, data) {
            state[data.key] = data.value
        },
        
    }
}

export default userStore;