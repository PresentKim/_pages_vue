import Vector2 from '../classes/vector2.js'

export default function angleToDirection(angle, isRadian = false) {
  if (isRadian) angle = angle * Math.PI / 180;
  return new Vector2(-Math.sin(angle), -Math.cos(angle));
}
