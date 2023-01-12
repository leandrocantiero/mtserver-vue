import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError, showSuccess } from "@/util/helpers";

import store from '../index'

import axios from 'axios'

const state = {
    goal: {},
    goals: {
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
        state.goal = {}
        state.type = 'add'
        state.modal = true

        store.dispatch('goalStore/loadCombos')
    },

    edit: ({ state }, goal) => {
        state.goal = { ...goal }
        state.type = 'edit'
        state.modal = true

        console.log(goal)

        store.dispatch('goalStore/loadCombos')
    },

    loadCombos: ({ state }) => {
        // load sellers
        store.dispatch('sellerStore/get', { pageSize: 1000, sortBy: ['Nome'], sortDesc: [false] })

        // load customers
        store.dispatch('customerStore/get', { pageSize: 1000, sortBy: ['RazaoSocial'], sortDesc: [false] })

        // load products
        store.dispatch('productStore/get', { pageSize: 1000, sortBy: ['Descricao'], sortDesc: [false] })

        // load families
        store.dispatch('familyStore/get', { pageSize: 1000, sortBy: ['Descricao'], sortDesc: [false] })

        // load company
        store.dispatch('companyStore/getBranchs', { pageSize: 1000, sortBy: ['Nome'], sortDesc: [false] })
    },

    create: ({ state, dispatch }, goal) => {
        console.log(goal)
        state.loading = true
        return axios.post(`${API_URL}/Meta/Create`, goal)
            .then((res) => {
                dispatch('get')
                state.modal = false
                showSuccess('Meta salva com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    update: ({ state, dispatch }, goal) => {
        state.loading = true
        return axios.put(`${API_URL}/Meta/Edit`, goal)
            .then((res) => {
                dispatch('get')
                state.modal = false
                showSuccess('Meta salva com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    getById: ({ state }, id) => axios.get(`${API_URL}/Meta/GetByCodigo?codigo=${id}`).catch(showError),

    get: async ({ state }, filter) => {
        const query = new URLSearchParams({
            NomeOrEmail: filter ? filter.nomeOrEmail || "" : "",

            PageNumber: filter ? filter.pageNumber : 1,
            PageSize: filter ? filter.pageSize : 50,
            OrderBy: filter ? filter.sortBy[0] : "Periodo",
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/Meta/Get?${query}`)
            .then(res => {
                state.goals = res.data

                return res.data
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    remove({ state, dispatch }, item) {
        console.log(item)

        state.loading = true
        return axios.delete(`${API_URL}/Meta/Remove?FkFilial=${item.fkFilial}&FkVendedor=${item.fkVendedor}&FkClienteCnpjCpf=${item.fkClienteCnpjCpf}&FkProduto=${item.fkProduto}&FkFamilia=${item.fkFamilia}`)
            .then(_ => {
                dispatch('get')
                showSuccess('Meta excluída com sucesso!')
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