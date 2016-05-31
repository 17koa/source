var EventEmitter = require('events').EventEmitter;
var observer = new EventEmitter();

observer.on('topic', function () {
  console.log('topic has occured');
});

function main() {
  console.log('start');
  observer.emit('topic');
  console.log('end');
}

main()
// start
// topic has occured
// end