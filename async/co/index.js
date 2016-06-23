'use strict'

const co = require('co');

function* hello_generator() {
    console.log('before');
    yield 1;
    console.log('after');
    return 2
}
//
// var h = hello_generator();
//
// console.log(h.next());
// console.log(h.next());

co(hello_generator).catch(err => {
  console.log(err)
});
