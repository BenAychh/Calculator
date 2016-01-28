function Beautify(number) {
  var sign = '';
  if (number < 0) {
    sign = '-';
  }
  var squared = false;
  var pi = false;
  var nothing = true;
  var num = 0;
  var den = 0;
  if (number % Math.pi === 0) {
    nothing = false;
    pi = true;
    num = Math.floor(number / Math.pi) + 'pi';
  }
  fraction = new Fraction(number);
  num = fraction.n;
  den = fraction.d;
  if (num > 1000000) {
    squared = true;
    fraction = new Fraction(Math.pow(number, 2));
    if (fraction.n < 1000000) {
      nothing = false;
      num = Math.sqrt(fraction.n);
      den = Math.sqrt(fraction.d);
    } else {
      num = number;
    }
  }
  this.toString = function() {
    if (!squared && !pi) {
      if (fraction.d === 1) {
        return sign + fraction.n;
      } else {
        return fraction.n + " / " + fraction.d;
      }
    }
    if (nothing) {
      return sign + num;
    }
    if (pi) {
      return sign + num;
    }
    if (squared) {
      var numS = (num % 1 === 0 ? '' + num : 'sqrt(' + Math.round(Math.pow(num, 2)) + ')');
      var denS = '';
      if (den % 1 !== 0) {
        if (numS === '1') {
          numS = '';
        }
        numS += numS + 'sqrt(' + Math.round(Math.pow(den, 2)) + ')';
        denS = Math.round(Math.pow(den, 2));
      } else {
        denS = den;
      }
      console.log(den);
      if (den != 1) {
        return sign + numS + " / " + denS;
      }
      else {
        return sign + numS;
      }
    }
  };
}
