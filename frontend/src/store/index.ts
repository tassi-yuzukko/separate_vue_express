import { createStore } from 'vuex'

export default createStore({
    state: {
        isLogin: false,
        userId: ''
    },
    getters: {
    },
    mutations: {
        auth(state, user) {
            state.isLogin = true;
            state.userId = user;
        }
    },
    actions: {
        fetch(context, user) {
            context.commit('auth', user);
        }
    },
    modules: {
    }
})
