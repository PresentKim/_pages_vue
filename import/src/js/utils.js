// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

function rand(min, max, point = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(point));
}

function plusOrMinus() {
  return Math.random() < 0.5 ? -1 : 1;
}
