// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

function angleToDirection(angle) {
  return new Vector2(-Math.sin(angle), -Math.cos(angle));
}

// vec1 -> vec2 angle
function vecToAngle(vec1, vec2) {
  /*
  var distX = vec1.x - circle2.x;
  var distY = vec1.y - circle2.y;
  return Math.atan2(distX, distY) * 180 / Math.PI;
  */
  return Math.atan2(vec1.y - vec2.y, vec1.x - vec2.x) * 180 / Math.PI;
}

function distance(vec1, vec2) {
  /*
  var distX = vec1.x - vec2.x;
  var distY = vec1.y - vec2.y;
  var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  */
  return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}

function rand(min, max, point = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(point));
}

function getRelativeSize(size) {
  return size * Math.sqrt(canvas.width * canvas.height, 2) / 100;
}
