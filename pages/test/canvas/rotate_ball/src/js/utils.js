// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

function angleToDirection(angle, isRadian = false) {
  if (isRadian) angle = angle * Math.PI / 180;
  return new Vector2(-Math.sin(angle), -Math.cos(angle));
}

function vecToAngle(vec1, vec2) {
  return Math.atan2(vec1.y - vec2.y, vec1.x - vec2.x) * 180 / Math.PI;
}

function distance(vec1, vec2) {
  return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}

function rand(min, max, point = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(point));
}

function getRelativeSize(size) {
  return size * lastRelativeSize;
}

function updateRelativeSize() {
  lastRelativeSize = Math.sqrt(canvas.width * canvas.height, 2) / 100;
  return lastRelativeSize;
}
