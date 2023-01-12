import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError, showSuccess } from "@/util/helpers";

import axios from 'axios'

const state = {
    properties: {
        data: [],
        count: 0
    },

    filter: {},

    loading: false
}

const mutations = make.mutations(state)

const actions = {
    update: ({ state, dispatch }, property) => {
        state.loading = true
        return axios.put(`${API_URL}/Propriedade/Edit`, property)
            .then((res) => {
                dispatch('get')
                showSuccess('Propriedade salva com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 500))
    },

    getByName: ({ state }, id) => axios.get(`${API_URL}/Propriedade/GetByNome?codigo=${id}`).catch(showError),

    get: async ({ state }, filter) => {
        const query = new URLSearchParams({
            Descricao: filter ? filter.descricao || "" : "",

            PageNumber: filter ? filter.pageNumber || 1 : 1,
            PageSize: filter ? filter.pageSize : 100,
            OrderBy: filter ? filter.sortBy[0] : 'Descricao',
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/Propriedade/Get?${query}`)
            .then(res => {
                state.properties = res.data

                console.log(res.data)

                return res.data
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