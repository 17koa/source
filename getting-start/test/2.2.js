'use strict'

import test from 'ava'
var fs = require('fs')

test.before.cb((t) => {
  setTimeout(() => {
    t.end();
  }, 2000);
});

test('callback test', t => {
  // 读取package.json
  fs.readFile('../package.json', function(err, content){
    var license = content.toString();
    console.log(license)
    t.ifError(err)
    t.truthy(license)
  })
});
