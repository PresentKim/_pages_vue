import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onAnimationFrame: function() {},
    elements: {},
    categories: {
      'game': {
        icon: 'gamepad',
        title: 'Game',
        to: '/game',
        pages: [{
          icon: 'grid_on',
          title: '1to25',
          to: '/1to25'
        }]
      },
      'canvas': {
        icon: 'aspect_ratio',
        title: 'Canvas',
        to: '/canvas',
        pages: [{
          icon: 'bubble_chart',
          title: 'Bouncing Ball',
          to: '/bouncingball'
        }, {
          icon: 'timeline',
          title: 'Connect Dot',
          to: '/connectdot'
        }, {
          icon: 'track_changes',
          title: 'Rotate Ball',
          to: '/rotateball'
        }]
      }
    },
  },
  mutations: {}
})
