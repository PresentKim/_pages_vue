<template>
<v-layout>
  <canvas ref="canvas"></canvas>
</v-layout>
</template>

<script>
import Circle from 'classes/circle.js'
import ColorHSLA from 'classes/colorHSLA.js'

import * as Random from 'utils/Random'
import * as Vector from 'utils/Vector'

import FitCanvasMixin from 'vueMixin/fitCanvasMixin'

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
  mixins: [FitCanvasMixin],
  head: {
    title: {
      inner: 'Canvas',
      complement: 'Bouncing Ball'
    }
  },
  data() {
    return {
      balls: [],
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
      this.updateRelativeSize();

      var canvas = this.$refs.canvas;
      this.balls = [];

      while (this.balls.length < 30) {
        var ball = new Ball();
        ball.radius = Random.rand(3, 5, 7);
        var relativeRadius = this.getRelativeSize(ball.radius);
        ball.x = Random.rand(relativeRadius, canvas.width - relativeRadius);
        ball.y = Random.rand(relativeRadius, canvas.height - relativeRadius);
        ball.speed = Random.rand(3 / ball.radius, 5 / ball.radius, 7);
        var direction = Vector.angleToDirection(Random.rand(0, Math.PI, 7));
        ball.velocityX = direction.x * Random.plusOrMinus();
        ball.velocityY = direction.y * Random.plusOrMinus();
        ball.color = new ColorHSLA(Random.rand(0, 360));

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
        var relativeRadius = this.getRelativeSize(this.balls[i].radius);
        for (var j in this.balls) {
          if (i != j && this.colisionEachBall(this.balls[i], this.balls[j])) {
            var direction = Vector.angleToDirection(Math.atan2(this.balls[j].x - this.balls[i].x, this.balls[j].y - this.balls[i].y));
            var overlap = relativeRadius + this.getRelativeSize(this.balls[j].radius) - Vector.distance(this.balls[i], this.balls[j]);
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
        var rawVelocity = Vector.angleToDirection(Math.atan2(this.balls[i].velocityX, this.balls[i].velocityY));
        rawVelocity.multiply(this.balls[i].speed * this.relativeSize);
        this.balls[i].velocityX -= (this.balls[i].velocityX * 9 + rawVelocity.x) / 10;
        this.balls[i].velocityY -= (this.balls[i].velocityY * 9 + rawVelocity.y) / 10;
      }

      mouseBall.color.h = ++mouseBall.color.h % 361;
    },

    render: function() {
      this.updateRelativeSize(this.balls);

      var canvas = this.$refs.canvas;
      var context = canvas.getContext('2d');

      for (var i in this.balls) {
        context.beginPath();
        context.fillStyle = this.balls[i].color.toString();
        context.shadowBlur = 2 * this.relativeSize;
        context.shadowColor = context.fillStyle;
        context.arc(this.balls[i].x, this.balls[i].y, this.getRelativeSize(this.balls[i].radius), 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      }
    },

    onUpdate: function() {
      this.fitCanvasSize();
      this.move();
      this.render();
    },

    colisionEachBall: function(ball, ball2) {
      return Vector.colisionEachCircle(new Circle(ball.x, ball.y, this.getRelativeSize(ball.radius)), new Circle(ball2.x, ball2.y, this.getRelativeSize(ball2.radius)));
    }
  }
}
</script>
