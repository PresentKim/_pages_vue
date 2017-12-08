// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

var canvas = document.getElementById('canvas_ball');
var context = canvas.getContext('2d');
var handle = null;
var balls = [];

class Ball extends Circle {
  constructor(x = 0, y = 0, radius = 1, angle = 0, speed = 1, color = '') {
    super(x, y, radius);

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.color = color;
  }

  get relativeRadius() {
    return this.radius * Math.sqrt(canvas.clientWidth * canvas.clientHeight, 2) / 100;
  }

  colision(ball) {
    return colisionEachCircle(new Circle(this.x, this.y, this.relativeRadius), new Circle(ball.x, ball.y, ball.relativeRadius));
  }

  next() {
    var velocity = angleToVec(this.angle);
    return new Circle(this.x + velocity.x * this.speed, this.y + velocity.y * this.speed, this.radius);
  }
}

function generate() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  balls = [];
  var count = 10;
  var tryTime = 0;
  while (balls.length < count && tryTime < 10000) {
    var x = rand(0, canvas.clientWidth);
    var y = rand(0, canvas.clientHeight);
    var angle = rand(0, 314) / 100;
    var speed = rand(100, 200) / 100;
    var radius = rand(3, 5);
    var color = 'rgb(' + [rand(0, 255), rand(0, 255), rand(0, 255)] + ')';

    var ball = new Ball(x, y, radius, angle, speed, color);

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
        ball.angle = vecToAngle(ball, ball2);
        next = ball.next();
        break;
      }
    }
    if (next.x < relativeRadius) {
      next.x = relativeRadius;
      ball.angle = Math.PI * 2 - ball.angle;
    }
    if (next.x > canvas.width - relativeRadius) {
      next.x = canvas.width - relativeRadius;
      ball.angle = Math.PI * 2 - ball.angle;
    }
    if (next.y < relativeRadius) {
      next.y = relativeRadius;
      ball.angle = Math.PI - ball.angle;
    }
    if (next.y > canvas.height - relativeRadius) {
      next.y = canvas.height - relativeRadius;
      ball.angle = Math.PI - ball.angle;
    }
    if (!colision) {
      ball.from(next);
      ball.speed += 2;
      ball.speed /= 2;
    } else {
      ball.speed *= 2;
    }
    ball.angle %= Math.PI * 2;
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
    context.fillText(ball.angle + "º", ball.x, ball.y);
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
