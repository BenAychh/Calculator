var Preview = {
  delay: 150,        // delay after keystroke before updating

  result: null,     // filled in by Init below
  buffer: null,      // filled in by Init below

  timeout: null,     // store setTimout id
  mjRunning: false,  // true when MathJax is processing
  oldText: null,     // used to check if an update is needed

  initialize: function() {
    this.result = document.getElementById('result');
    this.buffer = document.getElementById('buffer');
  },

  swapBuffer: function() {
    var buffer = this.preview;
    var preview = this.buffer;
    this.buffer = buffer;
    this.preview = preview;
    buffer.style.visibility = 'hidden';
    buffer.style.position = 'absolute';
    preview.style.visibility = 'visible';
    preview.style.position = '';
  },

  update: function() {
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(this.callback, this.delay);
  },

  createPreview: function() {
    this.timeout = null;
    if (this.mjRunning) {
      return;
    }
    var text = document.getElementById('expression');
    if (text === this.oldText) {
      return;
    }
    this.buffer.innerHTML = this.oldText = text;
    this.mjRunning = true;
    MathJax.Hub.Queue(["Typeset", Mathjax.hub, this.buffer], ["PreviewDone", this]);
  },

  previewDone: function() {
    this.mjRunning = false;
    this.SwapBuffer();
  }

};

Preview.callback = MathJax.Callback(["CreatePreview",Preview]);
Preview.callback.autoReset = true;  // make sure it can run more than once
