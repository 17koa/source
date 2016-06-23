'use strict'

const co = require('co');

function f(){
  return function(){
    console.log('i am function')
  }
}

function e(){
  return function(){
    console.log('i am function')
  }
}

function sleep(ms){
  return function(callback){
    setTimeout(callback, ms);
  };
}


function* hello_generator() {
    console.log('1');
    yield sleep(3);
    console.log('2');
    yield sleep(1113)
    console.log('3');
}
//
// var h = hello_generator();
//
// console.log(h.next());
// console.log(h.next());

co(hello_generator).catch(err => {
  console.log(err)
});
