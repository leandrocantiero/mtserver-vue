import { make } from 'vuex-pathify'

import { API_URL } from '@/global'
import { showError, showSuccess } from "@/util/helpers";

import axios from 'axios'

const state = {
    image: {},
    images: {
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
        state.image = {}
        state.type = 'add'
        state.modal = true
    },

    edit: ({ state }, image) => {
        state.image = { ...image }
        state.type = 'edit'
        state.modal = true
    },

    save: ({ state, dispatch }, files) => {
        const formData = new FormData()

        for (let index = 0; index < files.length; index++) {
            const element = files[index];

            formData.append('files', element)
        }

        state.loading = true
        return axios.post(`${API_URL}/Imagem/Create`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((res) => {
                dispatch('get', null)
                state.modal = false
                showSuccess('Imagem(ns) salva com sucesso!')
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    getById: ({ state }, id) => axios.get(`${API_URL}/Imagem/GetByCodigo?codigo=${id}`).catch(showError),

    get: async ({ state }, filter) => {
        const query = new URLSearchParams({
            Nome: filter ? filter.nome || "" : "",

            PageNumber: filter ? filter.pageNumber : 1,
            PageSize: filter ? filter.pageSize : 50,
            OrderBy: filter ? filter.sortBy[0] : "Nome",
            Sort: filter ? filter.sortDesc[0] ? 'desc' : 'asc' : "asc",
        }).toString()

        state.loading = true
        return axios.get(`${API_URL}/Imagem/Get?${query}`)
            .then(res => {
                state.images = res.data

                return res.data
            })
            .catch(showError)
            .finally(() => setTimeout(() => { state.loading = false }, 400))
    },

    remove({ state, dispatch }, nome) {
        state.loading = true
        return axios.delete(`${API_URL}/Imagem/Remove?nome=${nome}`)
            .then(_ => {
                dispatch('get')
                showSuccess('Imagem excluída com sucesso!')
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