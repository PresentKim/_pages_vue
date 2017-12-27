<style scoped>
img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
}

.logo-icon {
  color: lime;
  font-size: 10rem;
}
</style>

<template>
<v-container fluid>
  <v-layout column align-center>
    <h1>{{ $store.state.categories.game.title }}</h1>
    <v-icon class="logo-icon">{{ $store.state.categories.game.icon }}</v-icon>
    <v-layout row align-center>
      <v-layout v-for="page in $store.state.categories.game.pages" :key="page.title">
        <v-icon x-large @click="$router.replace(page.to)">{{ page.icon }}</v-icon>
        &nbsp;
      </v-layout>
    </v-layout>
  </v-layout>
</v-container>
</template>

<script>
export default {
  head: {
    title: {
      inner: 'PresentKim',
      complement: 'Game'
    }
  },
  mounted() {
    this.$store.state.onAnimationFrame = function() {};
  }
}
</script>
