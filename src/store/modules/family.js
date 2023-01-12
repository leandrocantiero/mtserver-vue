import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError } from "@/util/helpers";

import axios from 'axios'

const state = {
    families: {
        data: [],
        count: 0
    },

    filter: {},

    loading: false
}

const mutations = make.mutations(state)

const actions = {
    getById: ({ state }, id) => axios.get(`${API_URL}/Familia/GetByCodigo?codigo=${id}`).catch(showError),

    get: async ({ state }, filter) => {
        const query = new URLSearchParams({
            PageNumber: filter ? filter.pageNumber || 1 : 1,
            PageSize: filter ? filter.pageSize : 50,
            OrderBy: filter ? filter.sortBy[0] : 'Nome',
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/Familia/Get?${query}`)
            .then(res => {
                state.families = res.data

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