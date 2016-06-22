'use strict'
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

for(let item of myIterable) {
  console.log(item); // [1, 2, 3]
}