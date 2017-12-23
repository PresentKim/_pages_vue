import Vue from 'vue'
import Router from 'vue-router'

const Main = () =>
  import ('../pages/Main.vue')
const OneTo25 = () =>
  import ('../pages/1to25.vue')
const BouncingBall = () =>
  import ('../pages/BouncingBall.vue')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    component: Main
  }, {
    path: '/1to25',
    component: OneTo25
  }, {
    path: '/bouncingball',
    component: BouncingBall
  }]
})
