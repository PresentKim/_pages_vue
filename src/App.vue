<template>
<v-app dark>
  <v-navigation-drawer fixed app clipped :mini-variant="miniVariant" v-model="drawer">
    <v-list>
      <v-list-group v-for="item in items" :value="item.active" :key="item.title">
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

        <v-list-tile v-for="subItem in item.items" :key="subItem.title" :href="subItem.href">
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
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <v-layout column align-center>
          <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
          <blockquote>
            &#8220;First, solve the problem. Then, write the code.&#8221;
            <footer>
              <small>
                <em>&mdash;John Johnson</em>
              </small>
            </footer>
          </blockquote>
        </v-layout>
      </v-slide-y-transition>
    </v-container>
  </v-content>

  <v-footer fixed app>
    <span>&copy; 2017</span>
  </v-footer>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      miniVariant: false,
      items: [{
        action: 'pages',
        title: 'Game',
        items: [{
          action: 'grid_on',
          title: '1to25',
          href: '#1to25'
        }]
      }, {
        action: 'aspect_ratio',
        title: 'Canvas',
        items: [{
          action: 'bubble_chart',
          title: 'Bouncing Ball',
          href: '#bouncing-ball'
        }, {
          action: 'timeline',
          title: 'Connect Dot',
          href: '#connect-dot'
        }, {
          action: 'track_changes',
          title: 'Rotate Ball',
          href: '#rotate-ball'
        }]
      }],
      title: {
        text: 'PresentKim',
        avatar: '/public/profile.png'
      }
    }
  }
}
</script>
