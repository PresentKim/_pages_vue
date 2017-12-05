// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  multiply(vec) {
    this.x *= vec.x;
    this.y *= vec.y;
  }

  divide(vec) {
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

function colisionEachCircle(circle1, circle2) {
  return Math.sqrt(Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2)) < (circle1.radius + circle2.radius);
}

function colisionRectangleCircle(circle, rectangle) {
  var dX = Math.abs(circle.x - rectangle.x - rectangle.width / 2);
  var dY = Math.abs(circle.y - rectangle.y - rectangle.height / 2);

  if (dX > (rectangle.width / 2 + circle.r)) {
    return false;
  }
  if (dY > (rectangle.height / 2 + circle.r)) {
    return false;
  }

  if (dX <= (rectangle.width / 2)) {
    return true;
  }
  if (dY <= (rectangle.height / 2)) {
    return true;
  }

  var dx = dX - rectangle.width / 2;
  var dy = dY - rectangle.height / 2;
  return (dx * dx + dy * dy <= (circle.r * circle.r));
}

// vec1 -> vec2 angle
function vecToAngle(vec1, vec2) {
  return Math.atan2(vec1.y - vec2.y, vec1.x - vec2.x) * 180 / Math.PI;
}

function angleToVec(angle) {
  return {
    x: -Math.sin(angle),
    y: -Math.cos(angle)
  }
}
