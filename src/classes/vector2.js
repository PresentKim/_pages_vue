export default class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vec, newc = false) {
    if (newc)
      return new Vector2(this.x, this.y).add(vec);

    if (vec instanceof Vector2) {
      this.x += vec.x;
      this.y += vec.y;

    } else if (!isNaN(vec)) {
      this.x += vec;
      this.y += vec;
    } else throw Error(vec + ' is not Vector2 or number');

    return this;
  }

  subtract(vec, newc = false) {
    if (newc)
      return new Vector2(this.x, this.y).subtract(vec);

    if (vec instanceof Vector2) {
      this.x -= vec.x;
      this.y -= vec.y;

    } else if (!isNaN(vec)) {
      this.x -= vec;
      this.y -= vec;
    } else throw Error(vec + ' is not Vector2 or number');

    return this;
  }

  multiply(vec, newc = false) {
    if (newc)
      return new Vector2(this.x, this.y).multiply(vec);

    if (vec instanceof Vector2) {
      this.x *= vec.x;
      this.y *= vec.y;

    } else if (!isNaN(vec)) {
      this.x *= vec;
      this.y *= vec;
    } else throw Error(vec + ' is not Vector2 or number');

    return this;
  }

  divide(vec, newc = false) {
    if (newc)
      return new Vector2(this.x, this.y).divide(vec);

    if (vec instanceof Vector2) {
      this.x /= vec.x;
      this.y /= vec.y;

    } else if (!isNaN(vec)) {
      this.x /= vec;
      this.y /= vec;
    } else throw Error(vec + ' is not Vector2 or number');

    return this;
  }

  set(vec, newc = false) {
    if (newc)
      return new Vector2(this.x, this.y);

    if (vec instanceof Vector2) {
      this.x = vec.x;
      this.y = vec.y;

    } else if (!isNaN(vec)) {
      this.x = vec;
      this.y = vec;
    } else throw Error(vec + ' is not Vector2 or number');

    return this;
  }
}
