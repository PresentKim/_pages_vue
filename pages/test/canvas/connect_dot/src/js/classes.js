// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

class Dot extends Vector2 {
  constructor(x, y, size, velocityX, velocityY, color) {
    super(x, y);

    this.size = size;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.color = color;
  }
}
