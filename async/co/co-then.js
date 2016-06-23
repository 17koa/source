'use strict'

const fs = require("fs");
const co = require('co');

co(function* () {
  return yield Promise.resolve(true);
}).then(function (val) {
  console.log(val);
  throw new Error('error now')
}, function (err) {
  console.error(err.stack);
}).catch(function (err) {
  console.error(err.stack);
});