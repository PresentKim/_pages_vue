import Vector2 from 'classes/vector2.js'

export function angleToDirection(angle, isRadian = false) {
  if (isRadian) angle = angle * Math.PI / 180;
  return new Vector2(-Math.sin(angle), -Math.cos(angle));
}

export function colisionEachCircle(circle1, circle2) {
  /*
  var distance = distance(circle1, circle2)
  var addedRadius = this.radius + controllers[i].radius;
  return distance < addedRadius;
  */
  return distance(circle1, circle2) < (circle1.radius + circle2.radius);
}

export function distance(vec1, vec2) {
  /*
  var distX = vec1.x - vec2.x;
  var distY = vec1.y - vec2.y;
  var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  */
  return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}

export function vecToAngle(vec1, vec2) {
  /*
  var distX = vec1.x - circle2.x;
  var distY = vec1.y - circle2.y;
  return Math.atan2(distX, distY) * 180 / Math.PI;
  */
  return Math.atan2(vec1.y - vec2.y, vec1.x - vec2.x) * 180 / Math.PI;
}
