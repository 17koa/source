function* myFirstGenerator() {
  console.log('Hi!'); // (A)
}

var gen = myFirstGenerator(); // Save a reference to the generator object
gen.next(); // This executes line (A)