function* doSomething() {
  // This sends 'hello' to the caller and pauses execution
  // of this function until next() is invoked
  yield 'hello';

  // This sends 'world' to the caller and pauses execution
  // of this function until next() is invoked
  // Notice the two-way communication happening at this point
  var lastInput = yield 'world';

  console.log(lastInput);
  
  return lastInput
}

var gen2 = doSomething();

// This prints out the value returned at the first yield and pauses
console.log(gen2.next()); // Prints 'hello'

// This resumes execution after the first yield until the next
// yield is encountered
console.log(gen2.next()); // Prints 'world'

// This resumes execution after the second yield but there is 
// nothing more to execute
console.log(gen2.next());