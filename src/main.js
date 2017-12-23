import Vue from 'vue'
import Vuetify from 'vuetify'
import VueHead from 'vue-head'
import router from './router'

import App from './App.vue'

import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)
Vue.use(VueHead, {
  separator: '-',
  complement: ''
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
