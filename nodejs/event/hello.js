var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

ee.on('topic', function () {
  console.log('topic has occured');
});

function main() {
  console.log('start');
  ee.emit('topic');
  console.log('end');
}

main()
// start
// topic has occured
// end