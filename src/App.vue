<template>
<v-app :dark="themeIsDark">
  <v-navigation-drawer fixed app hide-overlay clipped :mini-variant="miniVariant" v-model="drawer">
    <v-list>
      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Main</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-group v-for="(item, i) in items" :value="i" :key="item.title">
        <v-list-tile slot="item">
          <v-list-tile-action>
            <v-icon>{{ item.action }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile v-for="(subItem, si) in item.items" :key="si" :to="subItem.to">
          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar fixed app clipped-left>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-btn v-show="drawer" icon @click.stop="miniVariant = !miniVariant">
      <v-icon>{{miniVariant ? 'chevron_right' : 'chevron_left'}}</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <v-avatar size="36px" slot="activator"><img :src="title.avatar" alt=""></v-avatar>
      {{title.text}}
    </v-toolbar-title>
  </v-toolbar>

  <v-content>
    <router-view></router-view>
  </v-content>

  <v-footer fixed app>
    <span>&copy; 2017</span>

    <v-spacer></v-spacer>

    <v-btn icon @click.stop="changeTheme">
      <v-icon>format_color_fill</v-icon>
      <v-icon>{{themeIsDark ? 'chat_bubble' : 'chat_bubble_outline'}}</v-icon>
    </v-btn>
  </v-footer>
</v-app>
</template>

<script>
import Cookie from './cookie.js'

export default {
  head: {
    title: {
      inner: 'PresentKim',
      complement: 'Main'
    }
  },
  data() {
    return {
      themeIsDark: Cookie.getCookie('themeIsDark') != 'false',
      drawer: false,
      miniVariant: false,
      items: [{
        action: 'gamepad',
        title: 'Game',
        items: [{
          action: 'grid_on',
          title: '1to25',
          to: '/1to25'
        }]
      }, {
        action: 'aspect_ratio',
        title: 'Canvas',
        items: [{
          action: 'bubble_chart',
          title: 'Bouncing Ball',
          to: '/bouncingball'
        }, {
          action: 'timeline',
          title: 'Connect Dot',
          to: '/connectdot'
        }, {
          action: 'track_changes',
          title: 'Rotate Ball',
          to: '/rotateball'
        }]
      }],
      title: {
        text: 'PresentKim',
        avatar: 'public/profile.png'
      }
    }
  },
  methods: {
    changeTheme: function() {
      this.themeIsDark = !this.themeIsDark;
      Cookie.setCookie('themeIsDark', this.themeIsDark);
    },
    requestAnimationFrame: function() {
      this.$store.state.onAnimationFrame();
      window.requestAnimationFrame(this.requestAnimationFrame)
    }
  },
  mounted: function() {
    this.requestAnimationFrame();
  }
}
</script>
