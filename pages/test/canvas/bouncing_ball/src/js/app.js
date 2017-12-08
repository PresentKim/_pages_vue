// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

var canvas = document.getElementById('canvas_ball');
var context = canvas.getContext('2d');
var handle = null;
var balls = [];

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
      for (i in balls)
        if (ball.colision(balls[i])) {
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
  for (i in balls) {
    var next = balls[i].next();
    var relativeRadius = balls[i].relativeRadius;
    var colision = false;
    for (j in balls) {
      if (i != j && balls[i].colision(balls[j])) {
        var distX = balls[i].x - balls[j].x;
        var distY = balls[i].y - balls[j].y;
        var avgRadius = (relativeRadius + balls[j].relativeRadius) / 2;

        balls[i].velocityX = distX / avgRadius;
        balls[i].velocityY = distY / avgRadius;

        balls[j].velocityX = -distX / avgRadius;
        balls[j].velocityY = -distY / avgRadius;
        break;
      }
    }
    if (next.x < relativeRadius) {
      next.x = relativeRadius;
      balls[i].velocityX *= -1;
    }
    if (next.x > canvas.width - relativeRadius) {
      next.x = canvas.width - relativeRadius;
      balls[i].velocityX *= -1;
    }
    if (next.y < relativeRadius) {
      next.y = relativeRadius;
      balls[i].velocityY *= -1;
    }
    if (next.y > canvas.height - relativeRadius) {
      next.y = canvas.height - relativeRadius;
      balls[i].velocityY *= -1;
    }
    if (!colision) {
      balls[i].from(next);
    }
    var rawVelocity = angleToDirection(Math.atan2(balls[i].velocityX, balls[i].velocityY));
    rawVelocity.multiply(new Vector2(balls[i].speed, balls[i].speed));
    balls[i].velocityX -= (balls[i].velocityX + rawVelocity.x) / 2;
    balls[i].velocityY -= (balls[i].velocityY + rawVelocity.y) / 2;
  }
}

function render() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (i in balls) {
    context.beginPath();
    context.fillStyle = balls[i].color;
    context.arc(balls[i].x, balls[i].y, balls[i].relativeRadius, 0, Math.PI * 2, true);
    context.fill();
    /*
        context.font = "20px Arial";
        context.fillStyle = 'red';
        context.fillText(Math.round(balls[i].velocityX * 100) + ":" + Math.round(balls[i].velocityY * 100), balls[i].x, balls[i].y);
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
