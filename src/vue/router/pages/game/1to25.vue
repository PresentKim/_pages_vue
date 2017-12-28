<template>
<v-layout column align-center>
  <v-layout ref="title" row align-center>
    <v-layout grid-list-xs column align-center>
      <v-flex>
        <v-btn color="green">
          <v-icon>alarm_add</v-icon>TIME {{ playtimeText }}
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn color="blue" @click.stop="clickGoal()">
          <v-icon>done_all</v-icon>TARGET {{ target }} / {{ goal }}
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout grid-list-xs column>
      <v-flex>
        <v-btn color="green">
          <v-icon>alarm_on</v-icon>BEST {{ besttimeText }}
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn color="red" @click.stop="clickStartButton()">
          <v-icon>{{ target ? 'stop' : 'play_arrow' }}</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
  <v-container ref="grid">

  </v-container>
</v-layout>
</template>

<script>
export default {
  head: {
    title: {
      inner: 'Game',
      complement: '1to25'
    }
  },
  data() {
    return {
      playtime: 0,
      besttime: 0,
      goal: 25,
      target: 0,
      timedown: null
    }
  },
  computed: {
    playtimeText: function() {
      return this.paddingTime(this.playtime);
    },
    besttimeText: function() {
      return this.paddingTime(this.besttime);
    }
  },
  methods: {
    paddingTime: function(time) {
      function pad(number) {
        return number < 10 ? '0' + number : number;
      }

      return pad(Math.floor((time % 3600000) / 60000)) +
        ":" + pad(Math.floor((time % 60000) / 1000)) +
        ":" + pad(Math.floor((time % 1000) / 10));
    },
    clickGoal: function() {},
    clickStartButton: function() {
      if (this.target == 0) {
        this.timedown = new Date().getTime();
        this.target = 1;
      } else {
        this.target = 0;
      }
    },
    clickCell: function(index) {
      if (this.target == index + 1)
        ++this.target;
    },
    onUpdate: function() {
      if (this.target !== 0)
        this.playtime = new Date().getTime() - this.timedown;
    }
  },
  mounted() {
    this.$store.state.onAnimationFrame = this.onUpdate;
  }
}
</script>
