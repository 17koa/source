// https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch4.md
// http://javascript.tutorialhorizon.com/2015/09/16/generators-and-yield-in-es6/

// function* doSomething() {
//   // This sends 'hello' to the caller and pauses execution
//   // of this function until next() is invoked
//   yield 'hello';
// }
//
// var gen2 = doSomething();
//
// // This prints out the value returned at the first yield and pauses
// console.log(gen2.next()); // Prints 'hello'
// console.log(gen2.next()); // Prints 'hello'

function* d0(x) {
  // This sends 'hello' to the caller and pauses execution
  // of this function until next() is invoked
  yield x;
}


var _d0 = d0(4);
console.log(_d0.next());


console.log('---------------------------------------');


function* d1(x) {
  // This sends 'hello' to the caller and pauses execution
  // of this function until next() is invoked
  yield (x + 1);
}


var _d1 = d1(4);
console.log(_d1.next());


console.log('---------------------------------------');


function* d3(x) {
  // This sends 'hello' to the caller and pauses execution
  // of this function until next() is invoked
  var y = yield (x + 1);
  return x + y
}


var _d3 = d3(4);
console.log(_d3.next());// 5
console.log(_d3.next(2));// 6

console.log('---------------------------------------');


function* d2(x) {
  // This sends 'hello' to the caller and pauses execution
  // of this function until next() is invoked
  var y = 2 * (yield (x + 1));
  return x + y
}

var _d2 = d2(4);

// This prints out the value returned at the first yield and pauses
console.log(_d2.next()); // 5
console.log(_d2.next(5)); // 14

console.log('---------------------------------------');


function *d4(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var it = d4( 5 );

// note: not sending anything into `next()` here
console.log( it.next() );       // { value:6, done:false }
console.log( it.next( 12 ) );   // { value:8, done:false }
console.log( it.next( 13 ) );   // { value:42, done:true }

// You can see that we can still pass in parameters (x in our example) with the initial foo( 5 ) iterator-instantiation call, just like with normal functions, making x be value 5.
//
// 你可以看到我们foo( 5 )
//
// x = 5
//
//
// The first next(..) call, we don't send in anything. Why? Because there's no yield expression to receive what we pass in.
//
// 第一个next(..) 调用，我们没有做任何，为啥呢？因为没有yield表达式去接受我们传过去的值。
//
// But if we did pass in a value to that first next(..) call, nothing bad would happen. It would just be a tossed-away value. ES6 says for generator functions to ignore the unused value in this case. (Note: At the time of writing, nightlies of both Chrome and FF are fine, but other browsers may not yet be fully compliant and may incorrectly throw an error in this case).
//
// 但是，如果我们给第一个next(..)传值，也不会有什么坏事儿发生。这个值会被丢掉。ES6说在此种情景下generator函数会忽略没有用到的值。
//
// The yield (x + 1) is what sends out value 6.
//
// The second next(12) call sends 12 to that waiting yield (x + 1) expression, so y is set to 12 * 2, value 24.
//
// 第二个next(12)调用，发送12给等待的yield (x + 1)表达式，所以y就等于12 * 2, 值为 24.
//
//
// Then the subsequent yield (y / 3) (yield (24 / 3)) is what sends out the value 8. The third next(13) call sends 13 to that waiting yield (y / 3) expression, making z set to 13.
//
// 之后的yield (y / 3) = (yield (24 / 3)) 是发送的值是8。
//
// 第三个next(13)调用发送13给等待的yield (y / 3)表达式，即z=13
//
// Finally, return (x + y + z) is return (5 + 24 + 13), or 42 being returned out as the last value.
//
// 最后，返回(x + y + z)其实是返回(5 + 24 + 13)，或者42 会成为最后返回的value值。


console.log('---------------------------------------');


// Yield mul­ti­ple values

function* d5() {
  yield* ['hello', 'world'];
}

var gen = d5();

console.log(gen.next().value); // Prints 'hello'
console.log(gen.next().value); // Prints 'world'


// In fact, not only can you yield prim­i­tives, you can also yield other gen­er­a­tors. That pri­mar­ily because a gen­er­a­tor object is an iter­able in itself. For example.
console.log('---------------------------------------');

function* generatorFoo() {
  yield 1;
  yield 2;
}

function* generatorBar() {
  // First Create the generator object by invoking the function
  // then yield it.
  yield* generatorFoo();
  yield 'I am bar!'
}

var genObj1 = generatorFoo();
// Iterate on the generator object directly
console.log(genObj1.next().value); // Prints 1
console.log(genObj1.next().value); // Prints 2

var genObj2 = generatorBar();
// Iterate on the generator object directly that in itself yields
// the values of another generator
console.log(genObj2.next().value); // Prints 1
console.log(genObj2.next().value); // Prints 2
console.log(genObj2.next().value); // Prints I am bar!

console.log('---------------------------------------');

// You can also use the reg­u­lar for-of loop to do the same.

function* greet() {
  yield 'hello';
  yield 'world';
}

for (let message of greet()) {
  console.log(message);
}

console.log('---------------------------------------');

// Using the ‘return’ state­ment from within a generator.

// The value of a return state­ment is usu­ally unus­able inside of a gen­er­a­tor con­structs except when used with yield*. For example.

function* greet() {
  yield 'hello';
  yield 'world';
  return 1;
}

// The for-of construct doesnt print the value thats returned
for (let message of greet()) {
  console.log(message);
}

console.log('---------------------------------------');


// Now take a look at the fol­low­ing example

function* greet1() {
  yield 'hello';
  yield 'world';
  return 1;
}

function* greet2() {
  // The result of invoking yield* is the return value.
  var returnValue = yield* greet1();
  console.log(returnValue);
}

for (let message of greet2()) {
  console.log(message);
}

console.log('---------------------------------------');

// # Gen­er­a­tor invo­ca­tion and arguments
//
// There are 2 tricky aspects when deal­ing with gen­er­a­tors that lend it some spe­cial behaviour.
//
// – Invok­ing a gen­er­a­tor func­tion doesn’t exe­cute the func­tion right away.
// – The first invo­catin of next() on a gen­er­a­tor object does not accept any arguments.
//
// These two aspect directly impact how and when you pass argu­ments to a generator.


function* player(name) {
  console.log('name received'); // (A)
  var life = 1000;
  yield 'Hello' + name; // (B)
  yield 'You have a life of a ' + life + ' years'; // (C)
}

// Lets create our generator object
// Since our function acceps a name, we need
// to pass this name right away
var p = player('2货');
// Notice that although it seems like you executed
// the function above, it does not print the console statement
// at line (A)


// Invoking next() for the first time causes 
// line (A) to be printed and then
// pauses at line (B).
// Notice how the first next() does not take any argument
console.log(p.next().value); // Prints 'name received'

// Line (C) gets printed then paused
console.log(p.next().value); // Prints 'Hello Goku'

// Nothing more to execute
console.log(p.next().value); // Prints 'You have a life of a 1000 years'


console.log('---------------------------------------');


// Yield’ and gen­er­a­tor scope
//
// Last but not the least, yield can only be used when its in the scope of gen­er­a­tor. For exam­ple, the fol­low­ing code will not work.


function* generatorFoo() {
  [1, 2].forEach(function (item) {
    yield item; // This wont work because the scope has changed
  });
}

console.log('---------------------------------------');
