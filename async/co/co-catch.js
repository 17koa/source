'use strict'

const co = require('co');

co(function* () {
  return yield Promise.resolve(true);
}).then(co(function* () {
  throw new Error('error now')
})).catch(function(err){
  console.error(err.stack);
});