<template>
<div>
  <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</div>
</template>

<script>
import Circle from 'classes/circle.js'
import ColorHSLA from 'classes/colorHSLA.js'

import rand from 'utils/rand.js'
import plusOrMinus from 'utils/plusOrMinus.js'
import distance from 'utils/distance.js'
import colisionEachCircle from 'utils/colisionEachCircle.js'
import angleToDirection from 'utils/angleToDirection.js'
import vecToAngle from 'utils/vecToAngle.js'

class Ball extends Circle {
  constructor(x, y, radius, velocityX, velocityY, speed, color) {
    super(x, y, radius);

    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.speed = speed;
    this.color = color;
  }

  colision(ball) {
    return colisionEachCircle(new Circle(this.x, this.y, this.getRelativeSize(this.radius)), new Circle(ball.x, ball.y, this.getRelativeSize(ball.radius)));
  }

  next() {
    return new Circle(this.x + this.velocityX, this.y + this.velocityY, this.radius);
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
      balls: [],
    }
  },
  mounted() {
    Ball.prototype.getRelativeSize = this.getRelativeSize;
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d')

    var main = document.getElementsByClassName('content')[0];
    this.canvas.width = main.clientWidth;

    this.generate();
    this.$store.state.onAnimationFrame = this.onUpdate;

    var component = this;
    document.body.addEventListener('mousemove', function(evt) {
      var rect = component.canvas.getBoundingClientRect();
      component.balls[component.balls.length - 1].x = evt.clientX - rect.left;
      component.balls[component.balls.length - 1].y = evt.clientY - rect.top;
    }, false);

    document.body.addEventListener("touchmove", function(evt) {
      var rect = component.canvas.getBoundingClientRect();
      component.balls[component.balls.length - 1].x = evt.touches[0].clientX - rect.left;
      component.balls[component.balls.length - 1].y = evt.touches[0].clientY - rect.top;
    }, false);

    document.body.addEventListener("touchend", function(evt) {
      component.balls[component.balls.length - 1].x = Number.MAX_SAFE_INTEGER;
      component.balls[component.balls.length - 1].y = Number.MAX_SAFE_INTEGER;
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

      this.balls = [];
      var tryTime = 0;
      while (this.balls.length < 30 && tryTime < 10000) {
        var x = rand(0, this.canvas.width);
        var y = rand(0, this.canvas.height);
        var radius = rand(3, 5, 7);
        var speed = rand(3 / radius, 5 / radius, 7);
        var direction = angleToDirection(rand(0, Math.PI, 7));
        var velocityX = direction.x * speed * plusOrMinus();
        var velocityY = direction.y * speed * plusOrMinus();
        var color = new ColorHSLA(rand(0, 360));

        var ball = new Ball(x, y, radius, velocityX, velocityY, speed, color);

        var relativeRadius = this.getRelativeSize(ball.radius);
        var colision = ball.x < relativeRadius || ball.x > this.canvas.width - relativeRadius || ball.y < relativeRadius || ball.y > this.canvas.height - relativeRadius;
        if (!colision)
          for (var i in this.balls)
            if (ball.colision(this.balls[i])) {
              colision = true;
              break;
            }
        if (!colision)
          this.balls.push(ball);
        else
          tryTime++;
      }
      this.balls.push(new Ball(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 20, 0, 0, 0, new ColorHSLA(0, 100, 50, 0.5)));
      this.render();
    },

    move: function() {
      var mouSeBall = this.balls[this.balls.length - 1];
      for (var i in this.balls) {
        if (this.balls[i] == mouSeBall)
          continue;
        var next = this.balls[i].next();
        var relativeRadius = this.getRelativeSize(this.balls[i].radius);
        for (var j in this.balls) {
          if (i != j && this.balls[i].colision(this.balls[j])) {
            var direction = angleToDirection(Math.atan2(this.balls[j].x - this.balls[i].x, this.balls[j].y - this.balls[i].y));
            var overlap = relativeRadius + this.getRelativeSize(this.balls[j].radius) - distance(this.balls[i], this.balls[j]);
            this.balls[i].velocityX += direction.x * overlap;
            this.balls[i].velocityY += direction.y * overlap;
            this.balls[j].velocityX -= direction.x;
            this.balls[j].velocityY -= direction.y;
          }
        }
        if (next.x < relativeRadius) {
          next.x = relativeRadius;
          this.balls[i].velocityX *= -1;
        }
        if (next.x > this.canvas.width - relativeRadius) {
          next.x = this.canvas.width - relativeRadius;
          this.balls[i].velocityX *= -1;
        }
        if (next.y < relativeRadius) {
          next.y = relativeRadius;
          this.balls[i].velocityY *= -1;
        }
        if (next.y > this.canvas.height - relativeRadius) {
          next.y = this.canvas.height - relativeRadius;
          this.balls[i].velocityY *= -1;
        }
        this.balls[i].set(next);
        var rawVelocity = angleToDirection(Math.atan2(this.balls[i].velocityX, this.balls[i].velocityY));
        rawVelocity.multiply(this.balls[i].speed * this.relativeSize);
        this.balls[i].velocityX -= (this.balls[i].velocityX * 9 + rawVelocity.x) / 10;
        this.balls[i].velocityY -= (this.balls[i].velocityY * 9 + rawVelocity.y) / 10;
      }

      mouSeBall.color.h = ++mouSeBall.color.h % 361;
    },

    render: function() {
      this.updateRelativeSize(this.balls);

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (var i in this.balls) {
        this.context.beginPath();
        this.context.fillStyle = this.balls[i].color.toString();
        this.context.shadowBlur = 2 * this.relativeSize;
        this.context.shadowColor = this.context.fillStyle;
        this.context.arc(this.balls[i].x, this.balls[i].y, this.getRelativeSize(this.balls[i].radius), 0, Math.PI * 2, true);
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
