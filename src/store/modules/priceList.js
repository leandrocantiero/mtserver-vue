import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError } from "@/util/helpers";

import axios from 'axios'

const state = {
    priceLists: {
        data: [],
        count: 0
    },

    filter: {},

    loading: false
}

const mutations = make.mutations(state)

const actions = {
    get: async ({ state }, filter) => {
        const query = new URLSearchParams({
            Descricao: filter ? filter.descricao || "" : "",

            PageNumber: filter ? filter.pageNumber || 1 : 1,
            PageSize: filter ? filter.pageSize : 50,
            OrderBy: filter ? filter.sortBy[0] : 'Descricao',
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/TabelaPreco/Get?${query}`)
            .then(res => {
                state.priceLists = res.data

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