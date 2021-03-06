// callbacks to promise
var fs = require("fs");

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



hello('./package.json').then(function(data){
  console.log('way 1:\n')
  return new Promise(function(resolve, reject){
    console.log('promise result = ' + data)
    resolve(data)
  });
}).then(function(data){
  return new Promise(function(resolve, reject){
    resolve('1')
  });
}).then(function(data){
  console.log(data)
  
  return new Promise(function(resolve, reject){
    reject(new Error('reject with custom err'))
  });
}).catch(function(err) {
  console.log(err)
})



hello('./package.json').then(function(data){
  console.log('\n\nway 2:\n')
  return new Promise(function(resolve, reject){
    console.log('promise result = ' + data)
    resolve(data)
  }).then(function(data){
    return new Promise(function(resolve, reject){
      resolve('1')
    });
  }).catch(function(err) {
    console.log(err)
  })
}).then(function(data){
  console.log(data)
  
  return new Promise(function(resolve, reject){
    reject(new Error('reject with custom err'))
  });
}).catch(function(err) {
  console.log(err)
})


var step1 = function(data){
  console.log('\n\nway 3:\n')
  return new Promise(function(resolve, reject){
    console.log('promise result = ' + data)
    resolve(data)
  }).then(function(data){
    return new Promise(function(resolve, reject){
      resolve('1')
    });
  }).catch(function(err) {
    console.log(err)
  })
}

var step2 = function(data){
  console.log(data)
  
  return new Promise(function(resolve, reject){
    reject(new Error('reject with custom err'))
  });
}

hello('./package.json').then(step1).then(step2).catch(function(err) {
  console.log(err)
})
