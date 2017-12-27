<template>
<v-layout column align-center>
  <canvas ref="canvas"></canvas>
</v-layout>
</template>

<script>
import Vector2 from 'classes/vector2.js'
import ColorHSLA from 'classes/colorHSLA.js'

import * as Vector from 'utils/Vector'

import FitCanvasMixin from 'vueMixin/fitCanvasMixin'

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
  mixins: [FitCanvasMixin],
  head: {
    title: {
      inner: 'Canvas',
      complement: 'Rotate Ball'
    }
  },
  data() {
    return {
      circles: [],
    }
  },
  methods: {
    registerEvents: function(component) {
      component.$store.state.onAnimationFrame = component.onUpdate;
    },

    generate: function() {
      this.updateRelativeSize();

      this.circles = [];
      var canvas = this.$refs.canvas;
      var center = new Vector2(canvas.width / 2, canvas.height / 2);
      var radius = this.relativeSize * 29;

      for (var degree = 0; degree < 360; degree += 30)
        this.circles.push(new RotateCircle(0, 0, 12, Math.PI / 2 + Math.PI / 12 * this.circles.length).set(Vector.angleToDirection(degree, true).multiply(radius)));

      this.circles[0].enable = true;
    },

    move: function() {
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
      this.updateRelativeSize(this.circles);

      var canvas = this.$refs.canvas;
      var context = canvas.getContext('2d');
      var center = new Vector2(canvas.width / 2, canvas.height / 2);

      // Render circle
      for (var i in this.circles) {
        context.beginPath();
        var relativePosition = new Vector2(this.circles[i].x + center.x, this.circles[i].y + center.y);
        var calcAngle = Math.abs(this.circles[i].angle - this.circles[i].startAngle + Math.PI / 2);
        context.strokeStyle = new ColorHSLA(Vector.vecToAngle(relativePosition, center) + 120, 100, 50, calcAngle < Math.PI / 2 ? 1 - calcAngle / Math.PI * 1.8 : 0).toString();
        context.shadowBlur = 10;
        context.shadowColor = context.strokeStyle;
        context.lineWidth = 0.5 * this.relativeSize;
        context.arc(relativePosition.x, relativePosition.y, this.getRelativeSize(this.circles[i].radius), 0, Math.PI * 2, true);
        context.stroke();

        var velocity = Vector.angleToDirection(this.circles[i].angle + i * Math.PI / 12).multiply(this.getRelativeSize(this.circles[i].radius));
        var balls = [relativePosition.add(velocity, true), relativePosition.subtract(velocity, true)];

        for (var j in balls) {
          context.beginPath();
          context.fillStyle = new ColorHSLA(Vector.vecToAngle(balls[j], center) + 120).toString();
          context.shadowBlur = 10;
          context.shadowColor = context.fillStyle;
          context.arc(balls[j].x, balls[j].y, this.getRelativeSize(2), 0, Math.PI * 2, true);
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
      var canvas = this.$refs.canvas;
      var elements = this.$store.state.elements;
      var min = Math.min(elements.footer.$el.getBoundingClientRect().top - elements.toolbar.$el.clientHeight, elements.app.$el.clientWidth);
      canvas.width = min;
      canvas.height = min;
    }
  },
  mounted() {
    this.fitCanvasSize();
    this.generate();
    this.registerEvents(this);
  }
}
</script>
