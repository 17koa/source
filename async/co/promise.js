'use strict'

const fs = require("fs");
const co = require('co');

function hello (file) {
  return new Promise(function(resolve, reject){
    fs.readFile(file, (err, data) => {
    	if (err) {
    		reject(err);
    	} else {
    		resolve(data.toString())
    	}
    });
  });
}

// hello('./package.json').then(function(data){
//   console.log('promise result = ' + data)
// }).catch(function(err) {
//   console.log(err)
// })

co(function* (){
  // let data = yield hello('./package1.json');
  let data = yield hello('./package.json');
  
  console.log(data)
}).catch(console.log);
