// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

var canvas = document.getElementById('canvas_ball');
var context = canvas.getContext('2d');
var handle = null;
var balls = [];

class Ball extends Circle {
  constructor(x, y, radius, velocityX, velocityY, speed, color) {
    super(x, y, radius);

    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.speed = speed;
    this.color = color;
  }

  get relativeRadius() {
    return this.radius * Math.sqrt(canvas.clientWidth * canvas.clientHeight, 2) / 100;
  }

  colision(ball) {
    return colisionEachCircle(new Circle(this.x, this.y, this.relativeRadius), new Circle(ball.x, ball.y, ball.relativeRadius));
  }

  next() {
    return new Circle(this.x + this.velocityX, this.y + this.velocityY, this.radius);
  }
}

function generate() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  balls = [];
  var count = 50;
  var tryTime = 0;
  while (balls.length < count && tryTime < 10000) {
    var x = rand(0, canvas.clientWidth);
    var y = rand(0, canvas.clientHeight);
    var radius = rand(3, 5);
    var speed = rand(300, 500) / 100;
    var direction = angleToDirection(rand(0, 314) / 100);
    var velocityX = direction.x * speed * (rand(0, 1) == 1 ? 1 : -1);
    var velocityY = direction.y * speed * (rand(0, 1) == 1 ? 1 : -1);
    var color = 'rgb(' + [rand(0, 255), rand(0, 255), rand(0, 255)] + ')';

    var ball = new Ball(x, y, radius, velocityX, velocityY, speed, color);

    var relativeRadius = ball.relativeRadius;
    var colision = ball.x < relativeRadius || ball.x > canvas.width - relativeRadius || ball.y < relativeRadius || ball.y > canvas.height - relativeRadius;
    if (!colision)
      for (index in balls)
        if (ball.colision(balls[index])) {
          colision = true;
          break;
        }
    if (!colision)
      balls.push(ball);
    else
      tryTime++;
  }
  render();
}

function move() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  for (index in balls) {
    var ball = balls[index];
    var next = ball.next();
    var relativeRadius = ball.relativeRadius;
    var colision = false;
    for (index in balls) {
      var ball2 = balls[index];
      if (ball != ball2 && ball.colision(ball2)) {
        var distX = ball.x - ball2.x;
        var distY = ball.y - ball2.y;
        var avgRadius = (relativeRadius + ball2.relativeRadius) / 2;

        ball.velocityX = distX / avgRadius;
        ball.velocityY = distY / avgRadius;

        ball2.velocityX = -distX / avgRadius;
        ball2.velocityY = -distY / avgRadius;
        break;
      }
    }
    if (next.x < relativeRadius) {
      next.x = relativeRadius;
      ball.velocityX *= -1;
    }
    if (next.x > canvas.width - relativeRadius) {
      next.x = canvas.width - relativeRadius;
      ball.velocityX *= -1;
    }
    if (next.y < relativeRadius) {
      next.y = relativeRadius;
      ball.velocityY *= -1;
    }
    if (next.y > canvas.height - relativeRadius) {
      next.y = canvas.height - relativeRadius;
      ball.velocityY *= -1;
    }
    if (!colision) {
      ball.from(next);
    }
    var rawVelocity = angleToDirection(Math.atan2(ball.velocityX, ball.velocityY));
    rawVelocity.multiply(new Vector2(ball.speed, ball.speed));
    ball.velocityX -= (ball.velocityX + rawVelocity.x) / 2;
    ball.velocityY -= (ball.velocityY + rawVelocity.y) / 2;
  }
}

function render() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (index in balls) {
    var ball = balls[index];

    context.beginPath();
    context.fillStyle = ball.color;
    context.arc(ball.x, ball.y, ball.relativeRadius, 0, Math.PI * 2, true);
    context.fill();
    /*
        context.font = "20px Arial";
        context.fillStyle = 'red';
        context.fillText(Math.round(ball.velocityX * 100) + ":" + Math.round(ball.velocityY * 100), ball.x, ball.y);
    */
    context.closePath();
  }
}

function onUpdate() {
  move();
  render();
  handle = requestAnimationFrame(onUpdate);
}

function toggle() {
  if (handle)
    handle = cancelAnimationFrame(handle);
  else
    onUpdate();
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
