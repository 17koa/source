function* doSomething() {
    yield; // This just pauses execution but does not emit anything
}

// Create a generator object as usual
var gen1 = doSomething();

// As we saw earlier,
// function execution begins on the first invocation
// of next() but since this function has a yield,
// execution pauses the moment the keyword 'yield' is encountered
console.log(gen1.next());

// A second invocation attempts to resume execution of the
// function until it is complete or another yield is encountered
console.log(gen1.next());
