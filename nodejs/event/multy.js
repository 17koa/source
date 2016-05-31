// var EventEmitter = require('events')
// var util = require('util')
//
// var MyEmitter = function () {
//
// }
//
// util.inherits(MyEmitter, EventEmitter)
//
// const myEmitter = new MyEmitter();
//
// myEmitter.on('event', (a, b) => {
//   console.log(a, b, this);
//     // Prints: a b {}
// });
//
// myEmitter.emit('event', 'a', 'b');


var EventEmitter = require("events").EventEmitter;

var ee = new EventEmitter();
ee.on("someEvent", function () {
   console.log("event has occured");
});

ee.emit("someEvent");

ee.on("newListener", function (evtName, fn) {
     console.log("New Listener: " + evtName);
 });

 ee.on("removeListener", function (evtName) {
     console.log("Removed Listener: " + evtName);
 });

 function foo () {}

 ee.on("save-user", foo);
 ee.removeListener("save-user", foo);
 
 