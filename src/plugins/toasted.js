import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'mdi',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso' : payload.msg,
    { type: 'success', icon: 'mdi-check', position: 'top-center', theme: 'bubble' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Erro inesperado' : payload.msg,
    { type: 'error', icon: 'mdi-close', position: 'top-center', theme: 'bubble' }
)