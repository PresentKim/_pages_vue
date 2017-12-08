// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

function angleToDirection(angle) {
  return new Vector2(-Math.sin(angle), -Math.cos(angle));
}

function getDistance(vec1, vec2) {
  /*
  var distX = vec1.x - vec2.x;
  var distY = vec1.y - vec2.y;
  var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  */
  return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
