import { make } from 'vuex-pathify'

const state = {
    currentCompany: null,
    currentUser: null,

    menuItems: []
}

const mutations = make.mutations(state)

const actions = {
    init({ state }) {
        console.log('init - ', state.currentUser)

        this.dispatch('app/loadMenuItems')
    },

    loadMenuItems({ state }) {
        state.menuItems = [
            {
                name: "Dashboard",
                path: "/dashboard",
                icon: "fa fa-tv text-primary",
            },
            {
                name: "Cadastros",
                icon: "fa fa-clone text-blue",
                menu: true,
                children: [
                    {
                        name: "Justificativas",
                        icon: "fa fa-align-left text-primary",
                        path: "/justification",
                    },
                    {
                        name: "Situações",
                        icon: "fa fa-filter text-primary",
                        path: "/situation",
                    },
                    {
                        name: "Relacionamentos",
                        icon: "fa fa-table text-primary",
                        path: "/relation",
                    },
                ],
            },
            {
                name: "Vendedores",
                path: "/seller",
                icon: "fa fa-users text-primary",
            },
            {
                name: "Metas",
                path: "/goal",
                icon: "fa fa-bullseye text-primary",
            },
            {
                name: "Imagens",
                path: "/images",
                icon: "fa fa-image text-primary",
            },
            {
                name: "Base de dados",
                icon: "fa fa-database text-primary",
                path: "/database",
            },
            {
                name: "Configurações",
                path: "/configuration",
                icon: "fa fa-cog text-primary",
            },
        ]
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