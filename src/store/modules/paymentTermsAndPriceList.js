import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError, showSuccess } from "@/util/helpers";

import axios from 'axios'

const state = {
    relations: {
        data: [],
        count: 0
    },

    filter: {},

    loading: false
}

const mutations = make.mutations(state)

const actions = {
    create: ({ state, dispatch }, item) => {
        state.loading = true
        return axios.post(`${API_URL}/RelCondPgtoTabelaPreco/Create`, item)
            .then((res) => {
                dispatch('get')
                showSuccess('Relacionamento salvo com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 500))
    },

    get: async ({ state }, filter) => {
        const query = new URLSearchParams({
            Cliente: filter ? filter.cliente || "" : "",
            Vendedor: filter ? filter.vendedor || "" : "",

            PageNumber: filter ? filter.pageNumber || 1 : 1,
            PageSize: filter ? filter.pageSize : 100,
            OrderBy: filter ? filter.sortBy[0] : 'FkCondicaoPagamento',
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/RelCondPgtoTabelaPreco/Get?${query}`)
            .then(res => {
                state.relations = res.data

                return res.data
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    remove: ({ state, dispatch }, item) => {
        state.loading = true
        return axios.delete(`${API_URL}/RelCondPgtoTabelaPreco/Remove?${new URLSearchParams(item)}`)
            .then(res => {
                dispatch('get')
                showSuccess('Relacionamento excluído com sucesso!')
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