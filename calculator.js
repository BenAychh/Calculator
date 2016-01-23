var math = require('./math.min.js');
var Beautify = require('./beautifulDecimals');
// var number = math.round(math.eval('cos(40 deg)'), 10);
// console.log(number);
// var beautified = new Beautify(number);
// console.log(beautified.toString());

function calculate(string) {
  return math.eval(string);
}

module.exports = calculate;
