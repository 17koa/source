var EventEmitter = require('events')
var util = require('util')

var MyEmitter = function () {
 
}
util.inherits(MyEmitter, EventEmitter)


MyEmitter.prototype.dump = function(){
  console.log('-----------------------------------------\n')
  //EventEmitter { _events: { topic: [Function] }, _eventsCount: 1 }
  console.dir(this)
  var listeners = this.listeners('topic');
  
  console.dir(listeners)
  
  for (var i in listeners) {
    console.log(i)
    console.log(listeners[i])
  }
}

const myEmitter = new MyEmitter();

myEmitter.on('topic', (a, b) => {
  console.log(a, b, this);
    // Prints: a b {}
});


myEmitter.on('error', (err) => {
  console.log('error ..' + err);
    // Prints: a b {}
});


function cb (a) {
  console.log(a, this);
    // Prints: a b {}
}

function err (a) {
  throw new Error('ddd')
}
// myEmitter.on('topic', cb);

myEmitter.emit('topic', 'a', 'b');


myEmitter.dump();


myEmitter.addListener('topic', cb)

myEmitter.dump();

console.log(myEmitter.listenerCount());


myEmitter.removeListener('topic', cb);


myEmitter.dump();


myEmitter.removeAllListeners();


myEmitter.dump();


console.log(myEmitter.listenerCount());

// on、once、emit
//
// addListener
// removeListener
// removeAllListeners
//
// listeners
// listenerCount
// setMaxListeners



myEmitter.addListener('topic', err)

myEmitter.emit('topic', 'a', 'b');

myEmitter.dump();

