import Vue from 'vue'
import Router from 'vue-router'

const Main = () =>
  import ('./pages/Main.vue')
const OneTo25 = () =>
  import ('./pages/1to25.vue')
const BouncingBall = () =>
  import ('./pages/BouncingBall.vue')
const ConnectDot = () =>
  import ('./pages/ConnectDot.vue')
const RotateBall = () =>
  import ('./pages/RotateBall.vue')

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
  }, {
    path: '/connectdot',
    component: ConnectDot
  }, {
    path: '/rotateball',
    component: RotateBall
  }]
})
