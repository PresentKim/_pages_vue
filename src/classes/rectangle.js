import Vector2 from './vector2.js'

export default class Rectangle extends Vector2 {
  constructor(x = 0, y = 0, height = 1, width = 1) {
    super(x, y);

    this.height = height;
    this.width = width;
  }
}
