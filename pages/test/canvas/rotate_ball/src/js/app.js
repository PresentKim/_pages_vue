// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"
var gridContainer = null;
var canvas = document.createElement('canvas');
canvas.setAttribute('id', 'rotate_ball');
canvas.setAttribute('class', 'bordered');
var context = canvas.getContext('2d');
var handle = null;
var dots = [];
var circles = [];
var relativeSize = 1;

w3.includeHTML(function() {
  addButton('Back', '../../canvas.html');

  gridContainer = document.getElementById('grid-container');

  document.getElementById('title-text').innerText = document.title = 'Rotate Ball';
  document.getElementById('intro').innerHTML = '';
  document.getElementById('grid-container').appendChild(canvas);

  canvas.width = gridContainer.clientWidth;
  canvas.height = gridContainer.clientHeight;

  generate();
  toggle();
});

function generate() {
  canvas.width = gridContainer.clientWidth;
  canvas.height = gridContainer.clientHeight;
  updateRelativeSize();

  circles = [];

  var center = new Vector2(canvas.width / 2, canvas.height / 2);
  var radius = relativeSize * 29;

  for (var degree = 0; degree < 360; degree += 30)
    circles.push(new RotateCircle(0, 0, 12, Math.PI / 2 + Math.PI / 12 * circles.length).from(angleToDirection(degree, true).multiply(radius).add(center)));

  circles[0].enable = true;
}

function move() {
  var center = new Vector2(canvas.width / 2, canvas.height / 2);
  for (i in circles) {
    if (!circles[i].enable) continue;

    circles[i].angle -= Math.PI / 90;

    if (circles[i].angle + Math.PI < circles[i].startAngle) {
      circles[i].angle = circles[i].startAngle;
      circles[i].enable = false;
    } else if (circles[i].angle + Math.PI / 5 < circles[i].startAngle)
      circles[i == 0 ? 11 : i - 1].enable = true;
  }
}

function render() {
  canvas.width = gridContainer.clientWidth;
  canvas.height = gridContainer.clientHeight;

  var lastRelativeSize = relativeSize;
  updateRelativeSize();
  if (relativeSize != lastRelativeSize) {
    var changedRatio = relativeSize / lastRelativeSize;

    for (i in circles)
      circles[i].multiply(changedRatio);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  var center = new Vector2(canvas.width / 2, canvas.height / 2);

  // Render circle
  for (i in circles) {
    context.beginPath();
    var calcAngle = Math.abs(circles[i].angle - circles[i].startAngle + Math.PI / 2);
    context.strokeStyle = new ColorHSLA(vecToAngle(circles[i], center) + 120, 100, 50, calcAngle < Math.PI / 2 ? 1 - calcAngle / Math.PI * 1.8 : 0).toString();
    context.shadowBlur = 10;
    context.shadowColor = context.strokeStyle;
    context.lineWidth = 0.5 * relativeSize;
    context.arc(circles[i].x, circles[i].y, getRelativeSize(circles[i].radius), 0, Math.PI * 2, true);
    context.stroke();

    var velocity = angleToDirection(circles[i].angle + i * Math.PI / 12).multiply(getRelativeSize(circles[i].radius));
    var balls = [circles[i].add(velocity, true), circles[i].subtract(velocity, true)];

    for (i in balls) {
      context.beginPath();
      context.fillStyle = new ColorHSLA(vecToAngle(balls[i], center) + 120).toString();
      context.shadowBlur = 10;
      context.shadowColor = 'gray';
      context.arc(balls[i].x, balls[i].y, getRelativeSize(2), 0, Math.PI * 2, true);
      context.fill();
      context.closePath();
    }
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
