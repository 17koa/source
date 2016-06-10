'use strict'

import test from 'ava'

function add (a, b) {
  return  a + b
}

test('simple test', t => {
  let c = 1 + 2
  
  t.is(c, 3)
});