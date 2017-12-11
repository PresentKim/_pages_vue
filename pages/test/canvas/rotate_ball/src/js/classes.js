// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

class Vector2 {
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

  from(vec) {
    this.x = vec.x;
    this.y = vec.y;
  }
}

class Circle extends Vector2 {
  constructor(x = 0, y = 0, radius = 1) {
    super(x, y);

    this.radius = radius;
  }
}

class RotateCircle extends Circle {
  constructor(x = 0, y = 0, radius = 1, startAngle = 0) {
    super(x, y, radius);

    this.startAngle = startAngle;
    this.angle = startAngle;
    this.enable = false;
  }
}

class ColorHSLA {
  constructor(h, s = 100, l = 50, a = 1) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.a = a;
    this.count = 0;
  }

  toString() {
    return 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
  }
}
