import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError, showSuccess } from "@/util/helpers";

import axios from 'axios'

const state = {
    situation: {},
    situations: {
        data: [],
        count: 0
    },

    filter: {},

    type: 'add',
    modal: false,
    loading: false
}

const mutations = make.mutations(state)

const actions = {
    add({ state }) {
        state.situation = {}
        state.type = 'add'
        state.modal = true
    },

    edit: ({ state }, situation) => {
        state.situation = { ...situation }
        state.type = 'edit'
        state.modal = true
    },

    create: ({ state, dispatch }, situation) => {
        state.loading = true
        return axios.post(`${API_URL}/SituacaoPedido/Create`, situation)
            .then((res) => {
                dispatch('get', null)
                state.modal = false
                showSuccess('Justificativa salva com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    update: ({ state, dispatch }, situation) => {
        state.loading = true
        return axios.put(`${API_URL}/SituacaoPedido/Edit`, situation)
            .then((res) => {
                dispatch('get')
                state.modal = false
                showSuccess('Justificativa salva com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    getById: ({ state }, id) => axios.get(`${API_URL}/SituacaoPedido/GetByCodigo?codigo=${id}`).catch(showError),

    get: async ({ state }, filter) => {
        const query = new URLSearchParams({
            Descricao: filter ? filter.descricao || "" : "",

            PageNumber: filter ? filter.pageNumber : 1,
            PageSize: filter ? filter.pageSize : 50,
            OrderBy: filter ? filter.sortBy[0] : "Descricao",
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/SituacaoPedido/Get?${query}`)
            .then(res => {
                state.situations = res.data

                return res.data
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    remove({ state, dispatch }, codigo) {
        state.loading = true
        return axios.delete(`${API_URL}/SituacaoPedido/Remove?codigo=${codigo}`)
            .then(_ => {
                dispatch('get')
                showSuccess('Justificativa excluída com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
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