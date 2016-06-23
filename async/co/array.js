'use strict'

const fs = require("fs");
const co = require('co');

function promise (file) {
  return new Promise(function(resolve, reject){
    console.log('promise')
    fs.readFile(file, (err, data) => {
    	if (err) {
    		reject(err);
    	} else {
        console.log('read file end' + data.toString())
    		resolve(data.toString())
    	}
    });
  });
}

function thunk (file) {
  return function (cb) {
    console.log('thunk')
    fs.readFile(file, cb);
  };
}

co(function* (){
  console.log('start')

  var arr = [thunk('./package.json'), Promise.resolve(2), 1, promise('./package.json')]
    
  var result = yield arr;
  
  console.log(result)
  console.log(result[1])
  
  console.log('end')
}).catch(console.log);
