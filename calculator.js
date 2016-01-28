//var math = require('./math.min.js');
//var Beautify = require('./beautifulDecimals');
//var Graphing = require('./graphing.js')
var graphingCanvas = document.getElementById('graphing');
var infoCanvas = document.getElementById('info');
var grapher = new Graphing(graphingCanvas);
var infoer = new Info(infoCanvas);
var functions = {};
var colors = ['#0000ff', '#009900', '#990099', '#9fa700', '#e8184b'];

function addLine(expression) {
  var graphIndex = expression.indexOf('graph');
  var fStartIndex = expression.indexOf('(', removegraphIndex) + 1;
  var fEndIndex = expression.indexOf(',', fStartIndex);
  var functionToGraph = expression.substring(fStartIndex, fEndIndex);
  var cStartIndex = fEndIndex + 1;
  var cEndIndex = expression.lastIndexOf(')');
  var color = expression.substring(cStartIndex, cEndIndex);
  color = color.replace(/\s/, '');
  grapher.addLine(equation, color);
  infoer.addLine(equation, color);
}
function addLine(equation, color) {
  grapher.addLine(equation, color);
  infoer.addLine(equation, color);
}
function removeLine(expression) {
  var removegraphIndex = expression.indexOf('removegraph');
  if (removegraphIndex !== -1) {
    grapher.removeLine(expression);
    infoer.removeLine(expression);
  }
  var frStartIndex = expression.indexOf('(', removegraphIndex) + 1;
  var frEndIndex = expression.lastIndexOf(')');
  var functionToRemove = expression.substring(frStartIndex, frEndIndex);
  grapher.removeLine(functionToRemove);
  infoer.removeLine(functionToRemove);
}
function calculate() {
  var input = document.getElementById('expression');
  var inputValue = input.value;
  if (inputValue.indexOf(':=') === -1) {
    while (inputValue.search(/\b[a-z]\([^x]/) !== -1) {
      inputValue = evaluateFunctionsAtSpecificValues(inputValue);
    }
  }
  var special = specialProcessor(inputValue);
  var precalculated = document.getElementById('precalculated');
  var calculated = document.getElementById('calculated');
  if (special.length === 0) {
    var simpleEvaluation = math.eval(inputValue);
    var beauty = new Beautify(simpleEvaluation);
    if (beauty.toString() != simpleEvaluation) {
      precalculated.innerHTML = '`' + beauty.toString() + " = " + math.round(simpleEvaluation, 10) + '`';
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'precalculated']);
      MathJax.Hub.Queue(function() {
        calculated.innerHTML = precalculated.innerHTML;
      });
    } else {
      calculated.innerHTML = simpleEvaluation;
    }
  } else {
    calculated.innerHTML = special;
  }
  input.select();
  input.focus();
}
function evaluateFunctionsAtSpecificValues(expression) {
  if (expression.indexOf)
  var specificFunctionString = expression.match(/\b[a-z]\([^x]/)[0];
  var specificFunctionStringStart = expression.indexOf(specificFunctionString);
  var subString = expression.substring(specificFunctionString, expression.length);
  var parenthesesCount = 0;
  var length = 0;
  for (var i = 0; i < subString.length; i++) {
    if (subString[i] === '(') {
      parenthesesCount++;
    } else if (subString[i] === ')'){
      parenthesesCount--;
      if (parenthesesCount === 0) {
        length = i;
        break;
      }
    }
  }
  console.log('entire passed function', subString.substring(0, length + 1));
  var functionName = subString.substring(0, 2);
  functionName += 'x)';
  console.log('function name: ', functionName);
  var numberStart = specificFunctionStringStart + 2;
  var number = subString.substring(2, subString.length - 1);
  console.log('unformatted number: ', number);
  number = math.eval(number);
  console.log('name: ', functions[functionName]);
  var evaluated = '(' + math.eval(functions[functionName], {x: number}) + ')';
  console.log('eval: ' + evaluated);
  var beginning = expression.substring(0, specificFunctionStringStart);
  console.log('begin' + beginning);
  var end = expression.substring(specificFunctionStringStart + length + 1, expression.length);
  console.log('end', end);
  return beginning + evaluated + end;
}

function replaceFunctions(input) {
  var indexOfFunction = input.search(/[[a-z]\([x]\)/);
  if (indexOfFunction === -1) {
    return input;
  }
  var specificFunctionName = input.substring(indexOfFunction, indexOfFunction + 4);
  console.log(specificFunctionName);
  var specificFunction = functions[specificFunctionName];
  var beginning = input.substring(0, indexOfFunction);
  var end = input.substring(indexOfFunction + 4, input.length);
  var newInput = beginning + specificFunction + end;
  console.log(newInput);
  return replaceFunctions(newInput);
}

function specialProcessor(expression) {
  if (expression.indexOf('removegraph') !== -1) {
    removeLine(expression);
    return 'removed ' + expression;
  } else if (expression.indexOf('graph') !== -1) {
    addLine(expression);
    return 'graphed ' + expression;
  } else if (expression.indexOf(':=') !== -1) {
    var keys = Object.keys(functions);
    var color = colors[keys.length];
    console.log(color);
    info = expression.split(':=');
    functions[info[0]] = info[1];
    addLine(functions[info[0]], color);
    return 'defined function ' + info[0];
  }
  return '';
}
//module.exports = calculate;
