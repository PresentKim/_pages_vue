import distance from './distance.js'

export default function colisionEachCircle(circle1, circle2) {
  /*
  var distance = distance(circle1, circle2)
  var addedRadius = this.radius + controllers[i].radius;
  return distance < addedRadius;
  */
  return distance(circle1, circle2) < (circle1.radius + circle2.radius);
}
