'use strict'

const co = require('co');

function sleep(ms) {
  return function (cb) {
    setTimeout(cb, ms);
  };
}

co(function* (){
  var now = Date.now();
  // wait for 1000 ms
  yield sleep(1000);
  
  console.log(Date.now() - now > 1000)
}).catch(console.log);
