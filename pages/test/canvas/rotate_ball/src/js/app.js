// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"
var gridContainer = null;
var canvas = document.createElement('canvas');
canvas.setAttribute('id', 'rotate_ball');
canvas.setAttribute('class', 'bordered');
var context = canvas.getContext('2d');
var handle = null;
var dots = [];
var circles = [];
var lastRelativeSize = 1;

w3.includeHTML(function() {
  addButton('Back', '../../canvas.html');

  gridContainer = document.getElementById('grid-container');

  document.getElementById('title-text').innerText = document.title = 'Rotate Ball';
  document.getElementById('intro').innerHTML = '';
  document.getElementById('grid-container').appendChild(canvas);

  canvas.width = gridContainer.clientWidth;
  canvas.height = gridContainer.clientHeight;
  lastRelativeSize = getRelativeSize(1);

  generate();
  toggle();
});

function generate() {
  canvas.width = gridContainer.clientWidth;
  canvas.height = gridContainer.clientHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  balls = [];
  circles = [];
  var center = new Vector2(canvas.width / 2, canvas.height / 2);
  var relative = Math.sqrt(canvas.width * canvas.height, 2) / 3;
  for (var degree = 0; degree < 360; degree += 15) {
    var radian = (degree + 7.5) * Math.PI / 180;
    var position = angleToDirection(radian).multiply(new Vector2(relative, relative), true).add(center, true);
    balls.push(new Circle(position.x, position.y, 3));

    if (degree % 30 == 0) {
      radian = degree * Math.PI / 180;
      position = angleToDirection(radian).multiply(new Vector2(relative, relative), true).add(center, true);
      var circle = new Circle(position.x, position.y, 13);
      circle.angle = 0;
      circles.push(circle);
    }
  }
  render();
}

function move() {
  var center = new Vector2(canvas.width / 2, canvas.height / 2);
  for (i in circles) {
    var targetBall = [balls[i * 2 + 1], balls[i * 2 - 2 < 0 ? 24 - i * 2 - 2 : i * 2 - 2]];
    var direction = angleToDirection(circles[i].angle + i * Math.PI / 12);
    var relativeRadius = getRelativeSize(circles[i].radius);

    targetBall[0].from(circles[i].add(direction.multiply(new Vector2(relativeRadius, relativeRadius), true), true));
    targetBall[1].from(circles[i].subtract(direction.multiply(new Vector2(relativeRadius, relativeRadius), true), true));

    circles[i].angle += Math.PI / 100;
    if (circles[i].angle > Math.PI * 2)
      circles[i].angle %= Math.PI * 2;
  }
}

function render() {
  canvas.width = gridContainer.clientWidth;
  canvas.height = gridContainer.clientHeight;

  var currentRelativeSize = getRelativeSize(1);
  if (lastRelativeSize != currentRelativeSize) {
    var changedRatio = currentRelativeSize / lastRelativeSize;
    lastRelativeSize = currentRelativeSize;

    var vecForMultiply = new Vector2(changedRatio, changedRatio);
    for (i in circles)
      circles[i].multiply(vecForMultiply);
    for (i in balls)
      balls[i].multiply(vecForMultiply);
  }
  context.clearRect(0, 0, canvas.width, canvas.height);

  var center = new Vector2(canvas.width / 2, canvas.height / 2);

  // Render circle
  for (i in circles) {
    context.beginPath();
    context.strokeStyle = new ColorHSLA(vecToAngle(circles[i], center) + 120).toString();
    context.arc(circles[i].x, circles[i].y, getRelativeSize(circles[i].radius), 0, Math.PI * 2, true);
    context.stroke();
    context.closePath();
  }

  // Render ball
  for (i in balls) {
    context.beginPath();
    context.fillStyle = new ColorHSLA(vecToAngle(balls[i], center) + 120).toString();
    context.arc(balls[i].x, balls[i].y, getRelativeSize(balls[i].radius), 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }
}

function onUpdate() {
  render();
  move();
  handle = requestAnimationFrame(onUpdate);
}

function toggle() {
  if (handle)
    handle = cancelAnimationFrame(handle);
  else
    onUpdate();
}
/*
document.body.addEventListener('mousemove', function(evt) {
  var rect = canvas.getBoundingClientRect();
  balls[0].x = evt.clientX - rect.left;
  balls[0].y = evt.clientY - rect.top;
}, false);
/*
document.body.addEventListener("touchmove", function(evt) {
  var rect = canvas.getBoundingClientRect();
  circles[circles.length - 1].x = evt.touches[0].clientX - rect.left;
  circles[circles.length - 1].y = evt.touches[0].clientY - rect.top;
}, false);

document.body.addEventListener("touchend", function(evt) {
  circles[circles.length - 1].x = Number.MAX_SAFE_INTEGER;
  circles[circles.length - 1].y = Number.MAX_SAFE_INTEGER;
}, false);
*/
