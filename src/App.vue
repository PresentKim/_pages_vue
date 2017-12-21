

<template>
<v-app dark>
  <v-navigation-drawer fixed :mini-variant="miniVariant" :clipped="true" v-model="drawer" app>
    <v-list>
      <v-list-tile value="true" v-for="(item, i) in items" :key="i">
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar fixed app :clipped-left="true">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
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

  <v-footer app :fixed="true">
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
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      title: {
        text: 'PresentKim',
        avatar: '/public/profile.png'
      }
    }
  }
}
</script>
