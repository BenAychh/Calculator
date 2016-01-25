//var math = require('./math.min.js');
//var Beautify = require('./beautifulDecimals');
//var Graphing = require('./graphing.js')
var canvas = document.getElementById('graphing');
var grapher = new Graphing(canvas);
function addLine() {
  var equation = document.getElementById('equation').value;
  var color = document.getElementById('color').value;
  grapher.addLine(equation, color);
  var deleteButtons = document.getElementById('lines');
  var button = document.createElement('button');
  button.innerHTML = 'delete: ' + equation;
  button.style.backgroundColor = color;
  button.data = equation;
  button.onclick = removeLine;
  deleteButtons.appendChild(button);
}
function removeLine() {
  grapher.removeLine(this.data);
  var deleteButtons = document.getElementById('lines');
  deleteButtons.removeChild(this);
}


//module.exports = calculate;
