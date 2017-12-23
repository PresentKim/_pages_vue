export default function distance(vec1, vec2) {
  /*
  var distX = vec1.x - vec2.x;
  var distY = vec1.y - vec2.y;
  var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  */
  return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}
