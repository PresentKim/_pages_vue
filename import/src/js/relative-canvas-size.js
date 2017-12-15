// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

var relativeSize = 1;
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

function getRelativeSize(size) {
  return size * relativeSize;
}

function updateRelativeSize(vector2Arr) {
  if (vector2Arr) {
    var lastRelativeSize = relativeSize;
    updateRelativeSize();
    if (relativeSize != lastRelativeSize) {
      var changedRatio = relativeSize / lastRelativeSize;

      for (i in vector2Arr)
        vector2Arr[i].multiply(changedRatio);
    }
  } else
    relativeSize = Math.sqrt(canvas.width * canvas.height, 2) / 100;
  return relativeSize;
}
