<template>
<v-layout column align-center>
  <canvas ref="canvas"></canvas>
</v-layout>
</template>

<script>
import Vector2 from 'classes/vector2.js'
import ColorHSLA from 'classes/colorHSLA.js'

import angleToDirection from 'utils/angleToDirection.js'
import vecToAngle from 'utils/vecToAngle.js'

import {
  updateRelativeSize,
  getRelativeSize,
  fitCanvasSize
} from 'utils/canvasUtils'

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
      relativeSize: null,
      circles: [],
    }
  },
  mounted() {
    this.fitCanvasSize();
    this.generate();
    this.registerEvents(this);
  },
  methods: {
    registerEvents: function(component) {
      component.$store.state.onAnimationFrame = component.onUpdate;
    },

    generate: function() {
      updateRelativeSize(this);

      this.circles = [];
      var canvas = this.$refs.canvas;
      var center = new Vector2(canvas.width / 2, canvas.height / 2);
      var radius = this.relativeSize * 29;

      for (var degree = 0; degree < 360; degree += 30)
        this.circles.push(new RotateCircle(0, 0, 12, Math.PI / 2 + Math.PI / 12 * this.circles.length).set(angleToDirection(degree, true).multiply(radius).add(center)));

      this.circles[0].enable = true;
    },

    move: function() {
      var canvas = this.$refs.canvas;
      var center = new Vector2(canvas.width / 2, canvas.height / 2);

      for (var i in this.circles) {
        if (!this.circles[i].enable)
          continue;

        this.circles[i].angle -= Math.PI / 90;

        if (this.circles[i].angle + Math.PI < this.circles[i].startAngle) {
          this.circles[i].angle = this.circles[i].startAngle;
          this.circles[i].enable = false;
        } else if (this.circles[i].angle + Math.PI / 5 < this.circles[i].startAngle)
          this.circles[i == 0 ? 11 : i - 1].enable = true;
      }
    },

    render: function() {
      updateRelativeSize(this, this.balls);

      var canvas = this.$refs.canvas;
      var context = canvas.getContext('2d');
      var center = new Vector2(canvas.width / 2, canvas.height / 2);

      // Render circle
      for (var i in this.circles) {
        context.beginPath();
        var calcAngle = Math.abs(this.circles[i].angle - this.circles[i].startAngle + Math.PI / 2);
        context.strokeStyle = new ColorHSLA(vecToAngle(this.circles[i], center) + 120, 100, 50, calcAngle < Math.PI / 2 ? 1 - calcAngle / Math.PI * 1.8 : 0).toString();
        context.shadowBlur = 10;
        context.shadowColor = context.strokeStyle;
        context.lineWidth = 0.5 * this.relativeSize;
        context.arc(this.circles[i].x, this.circles[i].y, getRelativeSize(this, this.circles[i].radius), 0, Math.PI * 2, true);
        context.stroke();

        var velocity = angleToDirection(this.circles[i].angle + i * Math.PI / 12).multiply(getRelativeSize(this, this.circles[i].radius));
        var balls = [this.circles[i].add(velocity, true), this.circles[i].subtract(velocity, true)];

        for (var j in balls) {
          context.beginPath();
          context.fillStyle = new ColorHSLA(vecToAngle(balls[j], center) + 120).toString();
          context.shadowBlur = 10;
          context.shadowColor = 'gray';
          context.arc(balls[j].x, balls[j].y, getRelativeSize(this, 2), 0, Math.PI * 2, true);
          context.fill();
          context.closePath();
        }
      }
    },

    onUpdate: function() {
      this.fitCanvasSize();
      this.move();
      this.render();
    },

    fitCanvasSize: function() {
      fitCanvasSize(this);
      var canvas = this.$refs.canvas;
      var min = Math.min(canvas.height, canvas.width);
      canvas.width = min;
      canvas.height = min;
    }
  }
}
</script>
