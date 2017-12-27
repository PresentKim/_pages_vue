export default {
  data() {
    return {
      relativeSize: null,
    }
  },
  methods: {
    updateRelativeSize: function(vector2Arr) {
      if (vector2Arr) {
        var lastRelativeSize = this.relativeSize;
        this.updateRelativeSize();
        if (this.relativeSize != lastRelativeSize) {
          var changedRatio = this.relativeSize / lastRelativeSize;

          for (var i in vector2Arr)
            vector2Arr[i].multiply(changedRatio);
        }
      } else {
        var canvas = this.$refs.canvas;
        this.relativeSize = Math.sqrt(canvas.width * canvas.height, 2) / 100;
      }
      return this.relativeSize;
    },

    getRelativeSize: function(size) {
      return size * this.relativeSize;
    },

    fitCanvasSize: function() {
      var canvas = this.$refs.canvas;
      var elements = this.$store.state.elements;
      canvas.height = elements.footer.$el.getBoundingClientRect().top - elements.toolbar.$el.clientHeight;
      canvas.width = elements.app.$el.clientWidth;
    }
  }
}
