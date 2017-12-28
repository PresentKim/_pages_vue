<style src="./1to25.less" lang="less" scoped ></style>

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
  <v-layout ref="grid" row id="grid">
    <div v-for="(num, i) in cells" ref="cells" :key="i" @click="clickCell(i, num)">{{ num }}</div>
  </v-layout>
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
      timedown: null,
      cells: new Array(25)
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
    clickGoal: function() {
      if (!this.target) {
        this.goal = this.goal >= 100 ? 25 : this.goal + 25;
      }
    },
    clickStartButton: function() {
      if (!this.target) {
        this.timedown = new Date().getTime();
        this.target = 1;

        this.cells = new Array(25);
        var count = 0;
        while (count < 25) {
          var number = Math.ceil(Math.random() * 25);
          if (this.cells.indexOf(number) == -1) {
            this.cells[count] = number;
            ++count;
          }
        }
      } else {
        this.target = 0;
      }
    },
    clickCell: function(i, num) {
      if (this.target) {
        if (this.target == num) {
          ++this.target;
        }
      }
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
