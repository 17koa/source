var co = require('co');

co(function* () {
  var sleep = require('./sleep');
  var now = Date.now();
  console.log(Date.now())
  // wait for 1000 ms
  yield sleep(1000);
  console.log(Date.now())

  console.log(1)
}).catch(function(err){
  console.log(err)
});