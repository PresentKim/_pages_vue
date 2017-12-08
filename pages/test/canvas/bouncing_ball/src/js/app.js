// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

var canvas = document.getElementById('canvas_ball');
var context = canvas.getContext('2d');
var handle = null;
var balls = [];

function generate() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  balls = [];
  var count = 30;
  var tryTime = 0;
  while (balls.length < count && tryTime < 10000) {
    var x = rand(0, canvas.width);
    var y = rand(0, canvas.height);
    var radius = rand(3, 5, 7);
    var speed = rand(3, 5, 7);
    var direction = angleToDirection(rand(0, Math.PI, 7));
    var velocityX = direction.x * speed * (rand(0, 1) ? 1 : -1);
    var velocityY = direction.y * speed * (rand(0, 1) ? 1 : -1);
    var color = new ColorHSLA(rand(0, 360));

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
  balls.push(new Ball(NaN, NaN, 20, 0, 0, 0, new ColorHSLA(0, 100, 50, 0.5)));
  render();
}

function move() {
  var mouSeBall = balls[balls.length - 1];
  for (i in balls) {
    if (balls[i] == mouSeBall)
      continue;
    var next = balls[i].next();
    var relativeRadius = balls[i].relativeRadius;
    for (j in balls) {
      if (i != j && balls[i].colision(balls[j])) {
        var direction = angleToDirection(Math.atan2(balls[j].x - balls[i].x, balls[j].y - balls[i].y));
        var overlap = relativeRadius + balls[j].relativeRadius - distance(balls[i], balls[j]);
        balls[i].velocityX += direction.x * overlap;
        balls[i].velocityY += direction.y * overlap;
        balls[j].velocityX -= direction.x;
        balls[j].velocityY -= direction.y;
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
    balls[i].from(next);
    var rawVelocity = angleToDirection(Math.atan2(balls[i].velocityX, balls[i].velocityY));
    rawVelocity.multiply(new Vector2(balls[i].speed, balls[i].speed));
    balls[i].velocityX -= (balls[i].velocityX * 9 + rawVelocity.x) / 10;
    balls[i].velocityY -= (balls[i].velocityY * 9 + rawVelocity.y) / 10;
  }

  mouSeBall.color.h = mouSeBall.color.h++ % 360;
}

function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (i in balls) {
    context.beginPath();
    context.fillStyle = balls[i].color.toString();
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
