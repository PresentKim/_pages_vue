<template>
<v-layout>
  <canvas ref="canvas"></canvas>
</v-layout>
</template>

<script>
import Vector2 from 'classes/vector2.js'
import ColorHSLA from 'classes/colorHSLA.js'

import * as Random from 'utils/Random'
import {
  distance
}
from 'utils/Vector'

import FitCanvasMixin from 'vueMixin/fitCanvasMixin'

class Dot extends Vector2 {
  constructor(x, y, size, velocityX, velocityY, color) {
    super(x, y);

    this.size = size;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.color = color;
  }
}

export default {
  mixins: [FitCanvasMixin],
  head: {
    title: {
      inner: 'Canvas',
      complement: 'Bouncing Ball'
    }
  },
  data() {
    return {
      dots: [],
    }
  },
  methods: {
    registerEvents: function(component) {
      component.$store.state.onAnimationFrame = component.onUpdate;

      var canvas = component.$refs.canvas;
      var mouseDot = this.dots[this.dots.length - 1];

      // mouseEventListener
      document.documentElement.addEventListener('mousedown', function(evt) {
        var rect = canvas.getBoundingClientRect();
        mouseDot.x = evt.clientX - rect.left;
        mouseDot.y = evt.clientY - rect.top;
      }, false);
      document.documentElement.addEventListener('mousemove', function(evt) {
        if (mouseDot.x != Number.MAX_SAFE_INTEGER) {
          var rect = canvas.getBoundingClientRect();
          mouseDot.x = evt.clientX - rect.left;
          mouseDot.y = evt.clientY - rect.top;
        }
      }, false);
      document.documentElement.addEventListener('mouseup', function(evt) {
        mouseDot.x = Number.MAX_SAFE_INTEGER;
      }, false);

      //touchEventListener
      document.documentElement.addEventListener("touchmove", function(evt) {
        var rect = canvas.getBoundingClientRect();
        mouseDot.x = evt.touches[0].clientX - rect.left;
        mouseDot.y = evt.touches[0].clientY - rect.top;
      }, false);

      document.documentElement.addEventListener("touchend", function(evt) {
        mouseDot.x = Number.MAX_SAFE_INTEGER;
      }, false);
    },

    generate: function() {
      this.updateRelativeSize();

      var canvas = this.$refs.canvas;
      this.dots = [];

      while (this.dots.length < 50) {
        var dot = new Dot();
        dot.size = Random.rand(1, 2, 7);
        dot.x = Random.rand(0, canvas.width);
        dot.y = Random.rand(0, canvas.height);
        dot.velocityX = Random.rand(0.1, 0.5, 7) * Random.plusOrMinus();
        dot.velocityY = Random.rand(0.1, 0.5, 7) * Random.plusOrMinus();
        dot.color = new ColorHSLA(Random.rand(0, 360));

        this.dots.push(dot);
      }
      // add mouseDot
      this.dots.push(new Dot(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 3, 0, 0, new ColorHSLA(0)));
    },

    move: function() {
      var canvas = this.$refs.canvas;
      var mouseDot = this.dots[this.dots.length - 1];

      for (var i in this.dots) {
        if (this.dots[i] == mouseDot)
          continue;
        this.dots[i].x += this.dots[i].velocityX * this.relativeSize;
        this.dots[i].y += this.dots[i].velocityY * this.relativeSize;
        if (this.dots[i].x < 0 || this.dots[i].x > canvas.width || this.dots[i].y < 0 || this.dots[i].y > canvas.height) {
          this.dots[i].x = Random.rand(0, canvas.width);
          this.dots[i].y = Random.rand(0, canvas.height);
          this.dots[i].velocityX = Random.rand(0.1, 0.5, 7) * (Random.rand(0, 1) ? 1 : -1);
          this.dots[i].velocityY = Random.rand(0.1, 0.5, 7) * (Random.rand(0, 1) ? 1 : -1);
        }
      }
      mouseDot.color.h = ++mouseDot.color.h % 361;
    },

    render: function() {
      this.updateRelativeSize(this.dots);

      var canvas = this.$refs.canvas;
      var context = canvas.getContext('2d');

      // Render connect line
      for (var i in this.dots) {
        var targets = [];
        for (var j in this.dots) {
          if (i == j)
            continue;
          var dotInfo = {
            index: j,
            dist: distance(this.dots[i], this.dots[j])
          };
          for (var ii = 0; ii < 2; ++ii)
            if (!targets[ii] || targets[ii].dist > dotInfo.dist) {
              targets[ii] = dotInfo;
              break;
            }
        }
        context.beginPath();
        for (var ii = 0; ii < 2; ++ii) {
          var target = this.dots[targets[ii].index];

          context.moveTo(this.dots[i].x, this.dots[i].y);
          context.shadowBlur = 1 * this.relativeSize;
          context.shadowColor = new ColorHSLA((this.dots[i].color.h + target.color.h) / 2).toString();
          context.lineWidth = 0.2 * this.relativeSize;
          context.strokeStyle = context.shadowColor;
          context.lineTo(target.x, target.y);
          context.stroke();
        }
        context.closePath();
      }

      // Render dot
      for (var i in this.dots) {
        context.beginPath();
        context.fillStyle = this.dots[i].color.toString();
        context.shadowBlur = 2 * this.relativeSize;
        context.shadowColor = context.fillStyle;
        context.arc(this.dots[i].x, this.dots[i].y, this.getRelativeSize(this.dots[i].size), 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      }
    },

    onUpdate: function() {
      this.fitCanvasSize();
      this.move();
      this.render();
    }
  },
  mounted() {
    this.fitCanvasSize();
    this.generate();
    this.registerEvents(this);
  }
}
</script>
