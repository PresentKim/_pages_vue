<template>
<v-container fluid>
  <v-layout column align-center>
    <h1>Main Page</h1>
    <img src="public/profile.png" alt="main.png" class="mb-5" />
    <v-layout row align-center>
      <v-layout v-for="category in $store.state.categories" :key="category.title">
        <v-icon x-large @click="$router.replace(category.to)">{{category.icon}}</v-icon>
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
      complement: 'Main'
    }
  },
  mounted() {
    this.$store.state.onAnimationFrame = function() {};
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
}
</style>
