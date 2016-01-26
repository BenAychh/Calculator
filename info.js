function Info(pCanvas) {
  var info = this;
  var ballRadius = 5;
  var canvas = pCanvas;
  var xmin = -10;
  var xmax = 10;
  var ymin = -10;
  var ymax = 10;
  var lines = {};
  var balls = {};
  this.addLine = function(equation, color) {
    lines[equation] = color;
  };
  this.removeLine = function(equation) {
    clearBalls();
    clearText();
    delete lines[equation];
    delete balls[equation];
  };
  this.mouseLocation = function(x) {
    clearBalls();
    setBalls(x);
    drawBalls();
    clearText();
    setText(x);
  };
  canvas.addEventListener('mousemove', function(e) {
    info.mouseLocation(e.clientX);
  });
  function clearText() {
    var lineKeys = Object.keys(lines);
    var context = canvas.getContext('2d');
    var top = canvas.height - 30 * (lineKeys.length - 1);
    context.clearRect(0, top - 30, 400, canvas.height - top + 40);
  }
  function setText(x) {
    var lineKeys = Object.keys(lines);
    var top = canvas.height - 30 * (lineKeys.length - 1);
    var xNumber = convertHPixelToNumber(x);
    lineKeys.forEach(function(line, key) {
      context.font = '20px calibri';
      context.fillStyle = lines[line];
      var yNumber = math.eval(line, {x: xNumber});
      context.fillText('f(' + math.round(xNumber, 2) + ')', 10, top + 30 * key - 10);
      context.fillText('= ' + math.round(yNumber), 60, top + 30 * key - 10);
    });
  }
  function setBalls(x) {
    var lineKeys = Object.keys(lines);
    lineKeys.forEach(function(key) {
      var xNumber = convertHPixelToNumber(x);
      var yNumber = math.eval(key, {x: xNumber});
      var y = convertVNumberToPixel(yNumber);
      balls[key] = {x: x, y: y};
    });
  }
  function drawBalls() {
    context = canvas.getContext('2d');
    var ballKeys = Object.keys(balls);
    ballKeys.forEach(function(key) {
      context.beginPath();
      context.arc(balls[key].x, balls[key].y, ballRadius, 0, 2 * Math.PI, false);
      context.fillStyle = lines[key];
      context.fill();
    });
  }
  function clearBalls() {
    context = canvas.getContext('2d');
    var ballKeys = Object.keys(balls);
    ballKeys.forEach(function(key) {
      context.clearRect(balls[key].x - ballRadius, balls[key].y - ballRadius,
        ballRadius * 2, ballRadius * 2);
    });
  }
  function convertHNumberToPixel(number) {
    if (number < xmin || number > xmax) {
      return undefined;
    }
    return Math.round((number - xmin) / (xmax - xmin) * canvas.width);
  }
  function convertHPixelToNumber(pixel) {
    return ((xmax - xmin) / canvas.width * pixel) + xmin;
  }
  function convertVNumberToPixel(number) {
    if (number < ymin || number > ymax) {
      return undefined;
    }
    return Math.round((1 - (number - ymin) / (ymax - ymin)) * canvas.height);
  }
  function convertVPixelToNumber(pixel) {
    return ((ymax - ymin) / canvas.height * pixel) + ymin;
  }
}
