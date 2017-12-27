<template>
<v-app ref="app" :dark="dark">
  <v-navigation-drawer ref="nav" fixed app hide-overlay clipped :mini-variant="miniVariant" v-model="showNav">
    <v-list>
      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Main</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-group v-for="category in $store.state.categories" :key="category.title">
        <v-list-tile slot="item">
          <v-list-tile-action @click.stop="$router.replace(category.to)">
            <v-icon>{{ category.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ category.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile v-for="page in category.pages" :key="page.title" :to="page.to">
          <v-list-tile-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ page.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar ref="toolbar" fixed app clipped-left>
    <v-toolbar-side-icon @click.stop="showNav = !showNav"></v-toolbar-side-icon>
    <v-btn v-show="showNav" icon @click.stop="miniVariant = !miniVariant">
      <v-icon>{{miniVariant ? 'chevron_right' : 'chevron_left'}}</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <v-avatar size="36px" slot="activator"><img :src="title.avatar" alt=""></v-avatar>
      {{title.text}}
    </v-toolbar-title>
  </v-toolbar>

  <v-content ref="content">
    <router-view></router-view>
  </v-content>

  <v-footer ref="footer" fixed app>
    <span>&copy; 2017</span>

    <v-spacer></v-spacer>

    <v-btn icon @click.stop="dark = !dark">
      <v-icon>format_color_fill</v-icon>
      <v-icon>{{dark ? 'chat_bubble' : 'chat_bubble_outline'}}</v-icon>
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
      dark: Cookie.getCookie('dark') != 'false',
      showNav: false,
      miniVariant: false,
      title: {
        text: 'PresentKim',
        avatar: 'public/profile.png'
      }
    }
  },
  methods: {
    requestAnimationFrame: function() {
      this.$store.state.onAnimationFrame();
      window.requestAnimationFrame(this.requestAnimationFrame)
    }
  },
  watch: {
    dark: function(val) {
      Cookie.setCookie('dark', val);
    }
  },
  mounted: function() {
    this.requestAnimationFrame();
    for (var name in this.$refs)
      this.$store.state.elements[name] = this.$refs[name];
  }
}
</script>
