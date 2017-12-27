<template>
<v-layout>
  <canvas ref="canvas"></canvas>
</v-layout>
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

import {
  updateRelativeSize,
  getRelativeSize,
  fitCanvasSize
} from 'utils/canvasUtils'

class Ball extends Circle {
  constructor(x, y, radius, velocityX, velocityY, speed, color) {
    super(x, y, radius);

    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.speed = speed;
    this.color = color;
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
      relativeSize: null,
      balls: [],
    }
  },
  mounted() {
    fitCanvasSize(this);
    this.generate();
    this.registerEvents(this);
  },
  methods: {
    registerEvents: function(component) {
      component.$store.state.onAnimationFrame = component.onUpdate;

      var canvas = component.$refs.canvas;
      var mouseBall = this.balls[this.balls.length - 1];

      // mouseEventListener
      document.documentElement.addEventListener('mousedown', function(evt) {
        var rect = canvas.getBoundingClientRect();
        mouseBall.x = evt.clientX - rect.left;
        mouseBall.y = evt.clientY - rect.top;
      }, false);
      document.documentElement.addEventListener('mousemove', function(evt) {
        if (mouseBall.x != Number.MAX_SAFE_INTEGER) {
          var rect = canvas.getBoundingClientRect();
          mouseBall.x = evt.clientX - rect.left;
          mouseBall.y = evt.clientY - rect.top;
        }
      }, false);
      document.documentElement.addEventListener('mouseup', function(evt) {
        mouseBall.x = Number.MAX_SAFE_INTEGER;
      }, false);

      //touchEventListener
      document.documentElement.addEventListener("touchmove", function(evt) {
        var rect = canvas.getBoundingClientRect();
        mouseBall.x = evt.touches[0].clientX - rect.left;
        mouseBall.y = evt.touches[0].clientY - rect.top;
      }, false);

      document.documentElement.addEventListener("touchend", function(evt) {
        mouseBall.x = Number.MAX_SAFE_INTEGER;
      }, false);
    },
    generate: function() {
      updateRelativeSize(this);

      var canvas = this.$refs.canvas;
      this.balls = [];

      while (this.balls.length < 30) {
        var ball = new Ball();
        ball.radius = rand(3, 5, 7);
        var relativeRadius = getRelativeSize(this, ball.radius);
        ball.x = rand(relativeRadius, canvas.width - relativeRadius);
        ball.y = rand(relativeRadius, canvas.height - relativeRadius);
        ball.speed = rand(3 / ball.radius, 5 / ball.radius, 7);
        var direction = angleToDirection(rand(0, Math.PI, 7));
        ball.velocityX = direction.x * plusOrMinus();
        ball.velocityY = direction.y * plusOrMinus();
        ball.color = new ColorHSLA(rand(0, 360));

        var colision = false;
        for (var i in this.balls)
          if (this.colisionEachBall(ball, this.balls[i])) {
            colision = true;
            break;
          }
        if (!colision)
          this.balls.push(ball);
      }
      // add mouseBall
      this.balls.push(new Ball(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 20, 0, 0, 0, new ColorHSLA(0, 100, 50, 0.5)));
    },

    move: function() {
      var canvas = this.$refs.canvas;
      var mouseBall = this.balls[this.balls.length - 1];

      for (var i in this.balls) {
        if (this.balls[i] == mouseBall)
          continue;
        var next = this.balls[i].next();
        var relativeRadius = getRelativeSize(this, this.balls[i].radius);
        for (var j in this.balls) {
          if (i != j && this.colisionEachBall(this.balls[i], this.balls[j])) {
            var direction = angleToDirection(Math.atan2(this.balls[j].x - this.balls[i].x, this.balls[j].y - this.balls[i].y));
            var overlap = relativeRadius + getRelativeSize(this, this.balls[j].radius) - distance(this.balls[i], this.balls[j]);
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
        if (next.x > canvas.width - relativeRadius) {
          next.x = canvas.width - relativeRadius;
          this.balls[i].velocityX *= -1;
        }
        if (next.y < relativeRadius) {
          next.y = relativeRadius;
          this.balls[i].velocityY *= -1;
        }
        if (next.y > canvas.height - relativeRadius) {
          next.y = canvas.height - relativeRadius;
          this.balls[i].velocityY *= -1;
        }
        this.balls[i].set(next);
        var rawVelocity = angleToDirection(Math.atan2(this.balls[i].velocityX, this.balls[i].velocityY));
        rawVelocity.multiply(this.balls[i].speed * this.relativeSize);
        this.balls[i].velocityX -= (this.balls[i].velocityX * 9 + rawVelocity.x) / 10;
        this.balls[i].velocityY -= (this.balls[i].velocityY * 9 + rawVelocity.y) / 10;
      }

      mouseBall.color.h = ++mouseBall.color.h % 361;
    },

    render: function() {
      updateRelativeSize(this, this.balls);

      var canvas = this.$refs.canvas;
      var context = canvas.getContext('2d');

      for (var i in this.balls) {
        context.beginPath();
        context.fillStyle = this.balls[i].color.toString();
        context.shadowBlur = 2 * this.relativeSize;
        context.shadowColor = context.fillStyle;
        context.arc(this.balls[i].x, this.balls[i].y, getRelativeSize(this, this.balls[i].radius), 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      }
    },

    onUpdate: function() {
      fitCanvasSize(this);
      this.move();
      this.render();
    },

    colisionEachBall: function(ball, ball2) {
      return colisionEachCircle(new Circle(ball.x, ball.y, getRelativeSize(this, ball.radius)), new Circle(ball2.x, ball2.y, getRelativeSize(this, ball2.radius)));
    }
  }
}
</script>
