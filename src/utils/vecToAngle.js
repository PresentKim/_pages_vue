export default function vecToAngle(vec1, vec2) {
  /*
  var distX = vec1.x - circle2.x;
  var distY = vec1.y - circle2.y;
  return Math.atan2(distX, distY) * 180 / Math.PI;
  */
  return Math.atan2(vec1.y - vec2.y, vec1.x - vec2.x) * 180 / Math.PI;
}
