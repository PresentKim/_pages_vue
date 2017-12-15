// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

class RotateCircle extends Vector2 {
  constructor(x = 0, y = 0, radius = 1, startAngle = 0) {
    super(x, y);

    this.radius = radius;
    this.startAngle = startAngle;
    this.angle = startAngle;
    this.enable = false;
  }
}
