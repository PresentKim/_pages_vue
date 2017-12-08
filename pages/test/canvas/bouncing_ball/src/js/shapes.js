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
  /*
  var distX = circle1.x - circle2.x;
  var distY = circle1.y - circle2.y;
  var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  var addedRadius = this.radius + controllers[i].radius;
  return distance < addedRadius;
  */
  return Math.sqrt(Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2)) < (circle1.radius + circle2.radius);
}

// vec1 -> vec2 angle
function vecToAngle(vec1, vec2) {
  /*
  var distX = vec1.x - circle2.x;
  var distY = vec1.y - circle2.y;
  return Math.atan2(distX, distY) * 180 / Math.PI;
  */
  return Math.atan2(vec1.y - vec2.y, vec1.x - vec2.x) * 180 / Math.PI;
}

function angleToDirection(angle) {
  return new Vector2(-Math.sin(angle), -Math.cos(angle));
}
