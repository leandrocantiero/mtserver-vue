import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError } from "@/util/helpers";

import axios from 'axios'

const state = {
    companies: {
        data: [],
        count: 0
    },

    branchs: {
        data: [],
        count: 0
    },

    filter: {},

    loading: false
}

const mutations = make.mutations(state)

const actions = {
    getCompanyById: ({ state }, id) => axios.get(`${API_URL}/Empresa/GetEmpresaByCodigo?codigo=${id}`).catch(showError),

    getCompanies: async ({ state }, filter) => {
        const query = new URLSearchParams({
            Nome: filter ? filter.nome || "" : "",
            UF: filter ? filter.uf || "" : "",

            PageNumber: filter ? filter.pageNumber || 1 : 1,
            PageSize: filter ? filter.pageSize : 50,
            OrderBy: filter ? filter.sortBy[0] : 'Nome',
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/Empresa/GetEmpresas?${query}`)
            .then(res => {
                state.companies = res.data

                return res.data
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    getBranchById: ({ state }, id) => axios.get(`${API_URL}/Empresa/GetFilialByCodigo?codigo=${id}`).catch(showError),

    getBranchs: async ({ state }, filter) => {
        const query = new URLSearchParams({
            Nome: filter ? filter.nome || "" : "",
            UF: filter ? filter.uf || "" : "",

            PageNumber: filter ? filter.pageNumber || 1 : 1,
            PageSize: filter ? filter.pageSize : 50,
            OrderBy: filter ? filter.sortBy[0] : 'Nome',
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/Empresa/GetFiliais?${query}`)
            .then(res => {
                state.branchs = res.data

                console.log('GetFiliais', res.data)

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