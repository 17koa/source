function* printTwoThings() {
  var val = yield;
  console.log(val);

  val = yield;
  console.log(val);
}

var gen = printTwoThings();

gen.next(); // Start the function execution
gen.next('hello'); // First yield
gen.next('world'); // Second yield