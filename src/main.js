import Vue from 'vue'
import Vuetify from 'vuetify'
import VueHead from 'vue-head'
import Grid from 'vue-js-grid'
import router from './vue/router'
import store from './vue/store'

import App from './App.vue'

import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)
Vue.use(VueHead, {
  separator: '-',
  complement: ''
})
Vue.use(Grid)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
