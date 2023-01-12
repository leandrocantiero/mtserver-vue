import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError } from "@/util/helpers";

import axios from 'axios'

const state = {
    products: {
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
            FkFamilia: filter ? filter.fkFamilia || "" : "",
            FkUnidadeMedida: filter ? filter.fkUnidadeMedida || "" : "",
            FkGrade1: filter ? filter.fkGrade1 || "" : "",
            FkGrade2: filter ? filter.fkGrade2 || "" : "",
            FkGrade3: filter ? filter.fkGrade3 || "" : "",

            PageNumber: filter ? filter.pageNumber || 1 : 1,
            PageSize: filter ? filter.pageSize : 50,
            OrderBy: filter ? filter.sortBy[0] : 'Descricao',
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/Produto/Get?${query}`)
            .then(res => {
                state.products = res.data

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