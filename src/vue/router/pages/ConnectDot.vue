<template>
<div>
  <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</div>
</template>

<script>
import Vector2 from '../../../classes/vector2.js'
import ColorHSLA from '../../../classes/colorHSLA.js'

import rand from '../../../utils/rand.js'
import plusOrMinus from '../../../utils/plusOrMinus.js'
import distance from '../../../utils/distance.js'

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
  head: {
    title: {
      inner: 'Canvas',
      complement: 'Bouncing Ball'
    }
  },
  data() {
    return {
      canvas: {},
      context: {},
      canvasHeight: 350,
      canvasWidth: 450,
      relativeSize: 1,
      dots: [],
    }
  },
  mounted() {
    Dot.prototype.getRelativeSize = this.getRelativeSize;
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d')

    var main = document.getElementsByClassName('content')[0];
    this.canvas.width = main.clientWidth;

    this.generate();
    this.onUpdate();
    var component = this;
    document.body.addEventListener('mousemove', function(evt) {
      var rect = component.canvas.getBoundingClientRect();
      component.dots[component.dots.length - 1].x = evt.clientX - rect.left;
      component.dots[component.dots.length - 1].y = evt.clientY - rect.top;
    }, false);

    document.body.addEventListener("touchmove", function(evt) {
      var rect = component.canvas.getBoundingClientRect();
      component.dots[component.dots.length - 1].x = evt.touches[0].clientX - rect.left;
      component.dots[component.dots.length - 1].y = evt.touches[0].clientY - rect.top;
    }, false);

    document.body.addEventListener("touchend", function(evt) {
      component.dots[component.dots.length - 1].x = Number.MAX_SAFE_INTEGER;
      component.dots[component.dots.length - 1].y = Number.MAX_SAFE_INTEGER;
    }, false);

  },
  methods: {
    updateRelativeSize: function(vector2Arr) {
      if (vector2Arr) {
        var lastRelativeSize = this.relativeSize;
        this.updateRelativeSize();
        if (this.relativeSize != lastRelativeSize) {
          var changedRatio = this.relativeSize / lastRelativeSize;

          for (var i in vector2Arr)
            vector2Arr[i].multiply(changedRatio);
        }
      } else
        this.relativeSize = Math.sqrt(this.canvas.width * this.canvas.height, 2) / 100;
      return this.relativeSize;
    },

    getRelativeSize: function(size) {
      return size * this.relativeSize;
    },

    generate: function() {
      this.updateRelativeSize();

      this.dots = [];
      while (this.dots.length < 50) {
        var x = rand(0, this.canvas.width);
        var y = rand(0, this.canvas.height);
        var velocityX = rand(0.1, 0.5, 7) * plusOrMinus();
        var velocityY = rand(0.1, 0.5, 7) * plusOrMinus();
        var color = new ColorHSLA(rand(0, 360));

        this.dots.push(new Dot(x, y, 1, velocityX, velocityY, color));
      }
      this.dots.push(new Dot(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 3, 0, 0, new ColorHSLA(0)));

      this.render();
    },

    move: function() {
      var mouSeDot = this.dots[this.dots.length - 1];
      for (var i in this.dots) {
        if (this.dots[i] == mouSeDot)
          continue;
        this.dots[i].x += this.dots[i].velocityX * this.relativeSize;
        this.dots[i].y += this.dots[i].velocityY * this.relativeSize;
        if (this.dots[i].x < 0 || this.dots[i].x > this.canvas.width || this.dots[i].y < 0 || this.dots[i].y > this.canvas.height) {
          this.dots[i].x = rand(0, this.canvas.width);
          this.dots[i].y = rand(0, this.canvas.height);
          this.dots[i].velocityX = rand(0.1, 0.5, 7) * (rand(0, 1) ? 1 : -1);
          this.dots[i].velocityY = rand(0.1, 0.5, 7) * (rand(0, 1) ? 1 : -1);
        }
      }
      mouSeDot.color.h = ++mouSeDot.color.h % 361;
    },

    render: function() {
      var dots = this.dots;
      this.updateRelativeSize(dots);

      // Render connect line
      for (var i in dots) {
        var dumpDots = dots.concat();
        dumpDots.splice(i, 1);
        dumpDots.sort(function(a, b) {
          return distance(dots[i], a) - distance(dots[i], b);
        });
        this.context.beginPath();
        for (var j = 0; j < 3; j++) {
          if (j < i && distance(dots[i], dots[j]) < 1000) {
            this.context.moveTo(dots[i].x, dots[i].y);
            this.context.shadowBlur = 1 * this.relativeSize;
            this.context.shadowColor = new ColorHSLA((dots[i].color.h, dots[i].color.h) / 2).toString();
            this.context.lineWidth = 0.2 * this.relativeSize;
            this.context.strokeStyle = 'gray';
            this.context.lineTo(dumpDots[j].x, dumpDots[j].y);
            this.context.stroke();
          }
        }
        this.context.closePath();
      }

      // Render dot
      for (var i in dots) {
        this.context.beginPath();
        this.context.fillStyle = dots[i].color.toString();
        this.context.shadowBlur = 2 * this.relativeSize;
        this.context.shadowColor = this.context.fillStyle;
        this.context.arc(dots[i].x, dots[i].y, this.getRelativeSize(dots[i].size), 0, Math.PI * 2, true);
        this.context.fill();
        this.context.closePath();
      }
    },

    onUpdate: function() {
      var main = document.getElementsByClassName('content')[0];
      this.canvas.width = main.clientWidth;
      //this.canvas.height = main.clientWidth;
      this.move();
      this.render();
      // loop
      window.requestAnimationFrame(this.onUpdate)
    }
  },
}
</script>

<style>
canvas {
  width: 100%;
  border: 1px solid;
}
</style>
