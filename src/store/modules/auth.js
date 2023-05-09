import { make } from 'vuex-pathify'

import { API_URL, USER_KEY } from '@/global'
import { showError, showSuccess } from "@/util/helpers";

import store from '../index'
import router from '@/routes/router'

import axios from 'axios'

const state = {
    loading: false,
}

const mutations = {
    ...make.mutations(state),

    setUser(user) {
        store.set('app/currentUser', user)

        if (user) {
            axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            localStorage.setItem(USER_KEY, JSON.stringify(user))
        } else {
            delete axios.defaults.headers.common['Authorization']
            localStorage.removeItem(USER_KEY)
        }
    },
}

const actions = {
    login({ state }, user) {
        state.loading = true
        return axios.post(`${API_URL}/Auth/SignIn`, user)
            .then(res => {
                mutations.setUser(res.data)
                router.push('/')

                // Init app
                store.dispatch("app/init")
                showSuccess('Usuário logado com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    register({ state }, user) {
        state.loading = true
        return axios
            .post(`${API_URL}/Auth/SignUp`, user)
            .then((res) => {
                router.push({ name: 'login', params: { user: res.data } })
                showSuccess("Registro concluído com sucesso");
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    logout({ state }) {
        mutations.setUser(null)
        router.push({ name: 'login' })
    },

    validateToken: async ({ state }) => {
        state.loading = true
        const user = JSON.parse(localStorage.getItem(USER_KEY))
        mutations.setUser(null)

        console.log('localStorage - ', user)

        if (!user) {
            state.loading = false
            return router.push({ name: 'login' })
        }

        return axios.post(`${API_URL}/Auth/ValidateToken`, user)
            .then(res => {
                if (res.data) {
                    mutations.setUser(user)

                    // Init app
                    store.dispatch("app/init")
                } else {
                    router.push({ name: 'Login' })
                }
            })
            .finally(_ => state.loading = false)
    },
}

const getters = make.getters(state)

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}