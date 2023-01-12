import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError, showSuccess } from "@/util/helpers";

import axios from 'axios'

const state = {
    seller: {},
    sellers: {
        data: [],
        count: 0
    },
    supervisors: {
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
        state.seller = {}
        state.type = 'add'
        state.modal = true
    },

    edit: ({ state }, seller) => {
        state.seller = { ...seller }
        state.type = 'edit'
        state.modal = true
    },

    update: ({ state, dispatch }, seller) => {
        console.log(seller)
        state.loading = true
        return axios.put(`${API_URL}/Vendedor/Edit`, seller)
            .then((res) => {
                dispatch('get')
                state.modal = false
                showSuccess('Vendedor salvo com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    getById: ({ state }, id) => axios.get(`${API_URL}/Vendedor/GetByCodigo?codigo=${id}`).catch(showError),

    get: async ({ state }, filter) => {
        const query = new URLSearchParams({
            NomeOrEmail: filter ? filter.nomeOrEmail || "" : "",
            SupervisorsOnly: filter ? filter.supervisorsOnly || false : false,

            PageNumber: filter ? filter.pageNumber || 1 : 1,
            PageSize: filter ? filter.pageSize : 50,
            OrderBy: filter ? filter.sortBy[0] : 'Nome',
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/Vendedor/Get?${query}`)
            .then(res => {
                if (filter && filter.supervisorsOnly) {
                    state.supervisors = res.data
                } else {
                    state.sellers = res.data
                }

                return res.data
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    remove({ state, dispatch }, codigo) {
        state.loading = true
        return axios.delete(`${API_URL}/Vendedor/Remove?codigo=${codigo}`)
            .then(_ => {
                dispatch('get')
                showSuccess('Vendedor excluído com sucesso!')
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