<template>
<v-container fluid>
  <v-layout column align-center>
    <img src="public/v.png" alt="main.png" class="mb-5" />
    <h1>1To25</h1>
  </v-layout>
</v-container>
</template>

<script>
export default {
  head: {
    title: {
      inner: 'Game',
      complement: '1to25'
    }
  },
  mounted() {
    this.$store.state.onAnimationFrame = function() {};
  }
}
</script>
