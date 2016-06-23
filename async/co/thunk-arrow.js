'use strict'

const fs = require('fs')
const co = require('co');

co(function* (){
  //timer
  console.log('timer 1');
  yield cb => setImmediate(cb)
  console.log('timer 2');
  yield cb => process.nextTick(cb)
  console.log('timer 3');
  yield cb => setTimeout(cb, 1000)
  console.log('timer 4');
  
  // fs
  var path = './package.json'
  
  console.log('fs 1');
  yield cb => fs.readFile(path, 'utf8', cb)
  console.log('fs 2');
  yield cb => fs.exists(path, x => cb(null, x))
  console.log('fs 3');
  yield cb => fs.exists(path, cb.bind(null, null))
  console.log('fs 4');
}).catch(console.log);

//
// How about just use ES6 arrow function instead of thunks ?
//
// // timer
// yield cb => setImmediate(cb)
// yield cb => process.nextTick(cb)
// yield cb => setTimeout(cb, 1000)
//
// // fs
// yield cb => fs.readFile(path, 'utf8', cb)
// yield cb => fs.exists(path, x => cb(null, x))
// yield cb => fs.exists(path, cb.bind(null, null))
//
// // request
// yield cb => request('http://google.com', cb)
//
// // redis or any database driver
// yield cb => client.get('key', cb)
// yield cb => client.set('key', 'val', cb)
// yield cb => MongoClient.connect('url...', cb)
//
//
// Note:
//
// - Arrow function was available in Chrome since v37. So probably soon to Node?
// - We still need to take care of inconsistency API, e.g. fs.exists.
// - It seems that arrow function in Chrome/V8 has pretty good performance based on this.
// - Arrow function approach will invoke function after yield, where thunks will invoke function before yield.