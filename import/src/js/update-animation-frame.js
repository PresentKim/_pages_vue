// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

var requestAnimationFrameHandle = null;
var onUpdate = null;

function toggleUpdate() {
  if (requestAnimationFrameHandle)
    updateDisable();
  else
    updateEnable();
}

function onAnimationFrame() {
  if (onUpdate)
    onUpdate();
  requestAnimationFrameHandle = requestAnimationFrame(onAnimationFrame);
}

function updateEnable() {
  requestAnimationFrameHandle = requestAnimationFrame(onAnimationFrame);
}

function updateDisable() {
  requestAnimationFrameHandle = cancelAnimationFrame(requestAnimationFrameHandle);
}
