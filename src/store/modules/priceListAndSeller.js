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
    create: ({ state, dispatch }, relation) => {
        state.loading = true
        return axios.post(`${API_URL}/RelVendedorTabelaPreco/Create`, relation)
            .then((res) => {
                dispatch('get')
                showSuccess('Relacionamento salvo com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    get: async ({ state }, filter) => {
        const query = new URLSearchParams({
            Vendedor: filter ? filter.vendedor || "" : "",
            TabelaPreco: filter ? filter.tabelaPreco || "" : "",

            PageNumber: filter ? filter.pageNumber || 1 : 1,
            PageSize: filter ? filter.pageSize : 100,
            OrderBy: filter ? filter.sortBy[0] : 'FkVendedor',
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/RelVendedorTabelaPreco/Get?${query}`)
            .then(res => {
                state.relations = res.data

                return res.data
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    remove: ({ state, dispatch }, item) => {
        state.loading = true
        return axios.delete(`${API_URL}/RelVendedorTabelaPreco/Remove?${new URLSearchParams(item)}`)
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