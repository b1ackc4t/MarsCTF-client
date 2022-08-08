import { createStore } from 'vuex'
import userStore from './modules/user'

const store = createStore({
    state() {
        return {
            AsideOpened: true,
        }
    },
    mutations: {
        switchAside(state) {
            state.AsideOpened = !state.AsideOpened
        }
    },
    modules: {
        userStore
    }
})

export default store;