<template>
<v-container fluid>
  <v-layout column align-center>
    <h1>Main Page</h1>
    <img src="public/profile.png" alt="main.png" class="mb-5" />
    <v-layout row align-center>
      <v-icon x-large @click="$router.replace('/game')">gamepad</v-icon>
      &nbsp;
      <v-icon x-large @click="$router.replace('/canvas')">aspect_ratio</v-icon>
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
