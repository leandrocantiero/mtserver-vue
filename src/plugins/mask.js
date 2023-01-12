import Vue from 'vue'
import VueTheMask from 'vue-the-mask'
import VueMoney from 'v-money'

Vue.use(VueTheMask)
Vue.use(VueMoney, {
    precision: 2, decimal: ',', thousands: '.', masked: false
})