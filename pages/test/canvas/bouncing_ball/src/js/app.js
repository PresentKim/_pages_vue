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
  balls.push(new Ball(0, 0, 20, 0, 0, 0, '#00000050'));
  render();
}

function move() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  for (i in balls) {
    if (i == balls.length - 1) continue;
    var next = balls[i].next();
    var relativeRadius = balls[i].relativeRadius;
    var colision = false;
    for (j in balls) {
      if (i != j && balls[i].colision(balls[j])) {
        var distX = balls[j].x - balls[i].x;
        var distY = balls[j].y - balls[i].y;
        var rawVelocity = angleToDirection(Math.atan2(distX, distY));
        var sumRadius = relativeRadius + balls[j].relativeRadius;
        var distance = Math.sqrt(Math.pow(Math.abs(distX), 2) + Math.pow(Math.abs(distY), 2));

        balls[i].velocityY = rawVelocity.y * (sumRadius - distance);
        balls[i].velocityX = rawVelocity.x * (sumRadius - distance);
        //balls[i].velocityY = rawVelocity.y * (relativeRadius + balls[j].relativeRadius) / 10;
        //balls[i].velocityX = rawVelocity.x * (relativeRadius + balls[j].relativeRadius) / 10;
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
    balls[i].velocityX -= (balls[i].velocityX * 9 + rawVelocity.x) / 10;
    balls[i].velocityY -= (balls[i].velocityY * 9 + rawVelocity.y) / 10;
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

generate();
toggle();

document.body.addEventListener('mousemove', function(evt) {
  var rect = canvas.getBoundingClientRect();
  balls[balls.length - 1].x = evt.clientX - rect.left;
  balls[balls.length - 1].y = evt.clientY - rect.top;
}, false);
