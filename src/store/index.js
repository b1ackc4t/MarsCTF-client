import { createStore } from 'vuex'

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
    }
})

export default store;