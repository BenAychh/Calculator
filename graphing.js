//var math = require('./math.min.js');
function Graphing(pCanvas) {
  var canvas = pCanvas;
  var xmin = -10;
  var xmax = 10;
  var ymin = -10;
  var ymax = 10;
  var lines = {};
  drawGrid();
  function drawGrid() {
    var hgrid = 1;
    var vgrid = 1;
    var context = canvas.getContext('2d');
    context.strokeStyle = '#adadad';
    for (i = xmin + hgrid; i < xmax; i += hgrid) {
      var xNumber = convertHNumberToPixel(i);
      context.beginPath();
      context.moveTo(xNumber,0);
      context.lineTo(xNumber, canvas.height);
      context.stroke();
    }
    for (i = ymin + vgrid; i < ymax; i += vgrid) {
      var yNumber = convertVNumberToPixel(i);
      context.beginPath();
      context.moveTo(0,yNumber);
      context.lineTo(canvas.width, yNumber);
      context.stroke();
    }
    if (convertHNumberToPixel(0)) {
      context.fillStyle = '#000000';
      context.fillRect(convertHNumberToPixel(0) - 1, 0, 3, canvas.height);
    }
    if (convertVNumberToPixel(0)) {
      var vzero = convertVNumberToPixel(0);
      context.fillStyle = '#000000';
      context.fillRect(0, vzero - 1, canvas.width, 3);
    }
  }
  this.addLine = function(equation, color) {
    lines[equation] = color;
    graphLines();
  }
  this.removeLine = function(equation) {
    console.log('being called');
    delete lines[equation];
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    graphLines();
  }
  function graphLines() {
    var context = canvas.getContext('2d');
    //var canvasData = context.getImageData(0, 0, canvas.width, canvas.height);
    var linesToGraph = Object.keys(lines);
    /*linesToGraph.forEach(function(equation) {
      var red = parseInt(lines[equation].substring(1, 3), 16);
      var green = parseInt(lines[equation].substring(3, 5), 16);
      var blue = parseInt(lines[equation].substring(5, 7), 16);
      console.log(red, green, blue);
      for (x = 0; x < canvas.width; x++) {
        var numberX = convertHPixelToNumber(x);
        var numberY = math.eval(equation, {x: numberX});
        var y = convertVNumberToPixel(numberY);
        console.log(x, y);
        var index = (x + y * canvas.width) * 4;
        canvasData.data[index + 0] = red;
        canvasData.data[index + 1] = green;
        canvasData.data[index + 2] = blue;
      }
    });
    context.putImageData(canvasData, 0, 0); */
    linesToGraph.forEach(function(equation) {
      var color = lines[equation];
      context.strokeStyle = color;
      context.beginPath();
      var started = false;
      for(xPixel = 1; xPixel < canvas.width; xPixel++ ){
        xNumber = convertHPixelToNumber(xPixel);
        yNumber = math.eval(equation, {x: xNumber});
        yPixel = convertVNumberToPixel(yNumber);
        if (yPixel ) {
          if (started) {
            context.lineTo(xPixel, yPixel);
          } else {
            context.moveTo(xPixel, yPixel);
            started = true;
          }
        }
      }
      context.stroke();
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
