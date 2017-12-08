// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vec, newc = false) {
    if (newc)
      return new Vector2(this.x + vec.x, this.y + vec.y);

    this.x += vec.x;
    this.y += vec.y;
  }

  subtract(vec, newc = false) {
    if (newc)
      return new Vector2(this.x - vec.x, this.y - vec.y);

    this.x -= vec.x;
    this.y -= vec.y;
  }

  multiply(vec, newc = false) {
    if (newc)
      return new Vector2(this.x * vec.x, this.y * vec.y);

    this.x *= vec.x;
    this.y *= vec.y;
  }

  divide(vec, newc = false) {
    if (newc)
      return new Vector2(this.x / vec.x, this.y / vec.y);

    this.x /= vec.x;
    this.y /= vec.y;
  }

  from(vec) {
    this.x = vec.x;
    this.y = vec.y;
  }
}

class Dot extends Vector2 {
  constructor(x, y, size, velocityX, velocityY, color) {
    super(x, y);

    this.size = size;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.color = color;
  }

  get relativeSize() {
    return this.size * Math.sqrt(canvas.width * canvas.height, 2) / 100;
  }
}

class ColorHSLA {
  constructor(h, s = 100, l = 50, a = 1) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.a = a;
  }

  toString() {
    return 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
  }
}
