<template>
<v-layout column align-center>
  <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</v-layout>
</template>

<script>
import Vector2 from 'classes/vector2.js'
import ColorHSLA from 'classes/colorHSLA.js'

import angleToDirection from 'utils/angleToDirection.js'
import vecToAngle from 'utils/vecToAngle.js'

class RotateCircle extends Vector2 {
  constructor(x = 0, y = 0, radius = 1, startAngle = 0) {
    super(x, y);

    this.radius = radius;
    this.startAngle = startAngle;
    this.angle = startAngle;
    this.enable = false;
  }
}

export default {
  head: {
    title: {
      inner: 'Canvas',
      complement: 'Rotate Ball'
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
    RotateCircle.prototype.getRelativeSize = this.getRelativeSize;
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d')

    var main = document.getElementsByClassName('content')[0];
    var min = Math.min(main.clientWidth, document.documentElement.clientHeight - 56 - 48);
    this.canvas.width = min;
    this.canvas.height = min;

    this.generate();
    this.$store.state.onAnimationFrame = this.onUpdate;
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

      this.circles = [];

      var center = new Vector2(this.canvas.width / 2, this.canvas.height / 2);
      var radius = this.relativeSize * 29;

      for (var degree = 0; degree < 360; degree += 30)
        this.circles.push(new RotateCircle(0, 0, 12, Math.PI / 2 + Math.PI / 12 * this.circles.length).set(angleToDirection(degree, true).multiply(radius).add(center)));

      this.circles[0].enable = true;

      this.render();
    },

    move: function() {
      var center = new Vector2(this.canvas.width / 2, this.canvas.height / 2);
      for (var i in this.circles) {
        if (!this.circles[i].enable) continue;

        this.circles[i].angle -= Math.PI / 90;

        if (this.circles[i].angle + Math.PI < this.circles[i].startAngle) {
          this.circles[i].angle = this.circles[i].startAngle;
          this.circles[i].enable = false;
        } else if (this.circles[i].angle + Math.PI / 5 < this.circles[i].startAngle)
          this.circles[i == 0 ? 11 : i - 1].enable = true;
      }
    },

    render: function() {
      this.updateRelativeSize(this.circles);
      var center = new Vector2(this.canvas.width / 2, this.canvas.height / 2);

      // Render circle
      for (var i in this.circles) {
        this.context.beginPath();
        var calcAngle = Math.abs(this.circles[i].angle - this.circles[i].startAngle + Math.PI / 2);
        this.context.strokeStyle = new ColorHSLA(vecToAngle(this.circles[i], center) + 120, 100, 50, calcAngle < Math.PI / 2 ? 1 - calcAngle / Math.PI * 1.8 : 0).toString();
        this.context.shadowBlur = 10;
        this.context.shadowColor = this.context.strokeStyle;
        this.context.lineWidth = 0.5 * this.relativeSize;
        this.context.arc(this.circles[i].x, this.circles[i].y, this.getRelativeSize(this.circles[i].radius), 0, Math.PI * 2, true);
        this.context.stroke();

        var velocity = angleToDirection(this.circles[i].angle + i * Math.PI / 12).multiply(this.getRelativeSize(this.circles[i].radius));
        var balls = [this.circles[i].add(velocity, true), this.circles[i].subtract(velocity, true)];

        for (var j in balls) {
          this.context.beginPath();
          this.context.fillStyle = new ColorHSLA(vecToAngle(balls[j], center) + 120).toString();
          this.context.shadowBlur = 10;
          this.context.shadowColor = 'gray';
          this.context.arc(balls[j].x, balls[j].y, this.getRelativeSize(2), 0, Math.PI * 2, true);
          this.context.fill();
          this.context.closePath();
        }
      }
    },

    onUpdate: function() {
      var main = document.getElementsByClassName('content')[0];
      var min = Math.min(main.clientWidth, document.documentElement.clientHeight - 56 - 48);
      this.canvas.width = min;
      this.canvas.height = min;
      this.move();
      this.render();
    }
  }
}
</script>
