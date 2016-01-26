//var math = require('./math.min.js');
//var Beautify = require('./beautifulDecimals');
//var Graphing = require('./graphing.js')
var graphingCanvas = document.getElementById('graphing');
var infoCanvas = document.getElementById('info');
var grapher = new Graphing(graphingCanvas);
var infoer = new Info(infoCanvas);
function addLine(equation, color) {
  grapher.addLine(equation, color);
  infoer.addLine(equation, color);
}
function removeLine(functionToRemove) {
  grapher.removeLine(functionToRemove);
  infoer.removeLine(functionToRemove);
}
function calculate() {
  var input = document.getElementById('expression').value;
  var special = specialProcessor(input);
  if (!special) {
    var result = document.getElementById('result');
    result.innerHTML = math.eval(input);
  }
}
function specialProcessor(expression) {
  var removegraphIndex = expression.indexOf('removegraph');
  var graphIndex = expression.indexOf('graph');
  if (removegraphIndex !== -1) {
    var frStartIndex = expression.indexOf('(', removegraphIndex) + 1;
    var frEndIndex = expression.lastIndexOf(')');
    var functionToRemove = expression.substring(frStartIndex, frEndIndex);
    console.log(functionToRemove);
    removeLine(functionToRemove);
    return true;
  } else if (graphIndex !== -1) {
    var fStartIndex = expression.indexOf('(', removegraphIndex) + 1;
    var fEndIndex = expression.indexOf(',', fStartIndex);
    var functionToGraph = expression.substring(fStartIndex, fEndIndex);
    var cStartIndex = fEndIndex + 1;
    var cEndIndex = expression.lastIndexOf(')');
    var color = expression.substring(cStartIndex, cEndIndex);
    color = color.replace(/\s/, '');
    console.log(functionToGraph + " / " + color);
    addLine(functionToGraph, color);
    return true;
  }
}
function beautifyInput(input) {
  var outputBox = document.getElementById('result').innerHTML = input;
  MathJax.Hub.Queue(['Text', MathJax.Hub, 'result']);
}
//module.exports = calculate;
