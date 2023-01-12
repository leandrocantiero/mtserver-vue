import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError, showSuccess } from "@/util/helpers";

import store from '../index'
import router from '@/routes/router'

import axios from 'axios'

const state = {
    database: {},

    loading: false,
}

const mutations = make.mutations(state)

const actions = {
    save({ state, dispatch }, database) {
        console.log(database)
        state.loading = true
        return axios.post(`${API_URL}/Database/Set`, database)
            .then(res => {
                dispatch('get')
                showSuccess("Conexão salva com sucesso!");
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    get({ state }) {
        state.loading = true
        return axios.get(`${API_URL}/Database/Get`)
            .then(res => {
                state.database = res.data

                if (!res.data) {
                    showError('Não existe uma configuração com o banco, realize uma para continuar')
                } else {
                    showSuccess("Conexão carregada com sucesso!")
                }
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    }
}

const getters = make.getters(state)

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}