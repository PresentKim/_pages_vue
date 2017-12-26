export function updateRelativeSize(component, vector2Arr) {
  if (vector2Arr) {
    var lastRelativeSize = component.relativeSize;
    updateRelativeSize(component);
    if (component.relativeSize != lastRelativeSize) {
      var changedRatio = component.relativeSize / lastRelativeSize;

      for (var i in vector2Arr)
        vector2Arr[i].multiply(changedRatio);
    }
  } else {
    var canvas = component.$refs.canvas;
    component.relativeSize = Math.sqrt(canvas.width * canvas.height, 2) / 100;
  }
  return component.relativeSize;
}

export function getRelativeSize(component, size) {
  return size * component.relativeSize;
}

export function fitCanvasSize(component) {
  /*
  var canvas = component.$refs.canvas;
  var elements = component.$store.state.elements;
  var startY = elements.toolbar.$el.clientHeight;
  var endY = elements.footer.$el.getBoundingClientRect().top;
  canvas.height = endY - startY;
  canvas.width = elements.app.$el.clientWidth;
  */
  var canvas = component.$refs.canvas;
  var elements = component.$store.state.elements;
  canvas.height = elements.footer.$el.getBoundingClientRect().top - elements.toolbar.$el.clientHeight;
  canvas.width = elements.app.$el.clientWidth;
}
