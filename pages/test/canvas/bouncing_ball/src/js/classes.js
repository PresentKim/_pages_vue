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

class Rectangle extends Vector2 {
  constructor(x = 0, y = 0, height = 1, width = 1) {
    super(x, y);

    this.height = height;
    this.width = width;
  }
}

class Circle extends Vector2 {
  constructor(x = 0, y = 0, radius = 1) {
    super(x, y);

    this.radius = radius;
  }
}

class Ball extends Circle {
  constructor(x, y, radius, velocityX, velocityY, speed, color) {
    super(x, y, radius);

    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.speed = speed;
    this.color = color;
  }

  get relativeRadius() {
    return this.radius * Math.sqrt(canvas.width * canvas.height, 2) / 100;
  }

  colision(ball) {
    return colisionEachCircle(new Circle(this.x, this.y, this.relativeRadius), new Circle(ball.x, ball.y, ball.relativeRadius));
  }

  next() {
    return new Circle(this.x + this.velocityX, this.y + this.velocityY, this.radius);
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
