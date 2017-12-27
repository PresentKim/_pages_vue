import Vue from 'vue'
import Router from 'vue-router'

const Main = () =>
  import ('./pages/Main.vue')

const Game = () =>
  import ('./pages/Game.vue')
const OneTo25 = () =>
  import ('./pages/game/1to25.vue')

const Canvas = () =>
  import ('./pages/Canvas.vue')
const BouncingBall = () =>
  import ('./pages/canvas/BouncingBall.vue')
const ConnectDot = () =>
  import ('./pages/canvas/ConnectDot.vue')
const RotateBall = () =>
  import ('./pages/canvas/RotateBall.vue')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    component: Main
  }, {
    path: '/game',
    component: Game
  }, {
    path: '/1to25',
    component: OneTo25
  }, {
    path: '/canvas',
    component: Canvas
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
