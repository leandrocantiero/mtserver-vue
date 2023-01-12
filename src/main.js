import Vue from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store';
import './plugins'

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});