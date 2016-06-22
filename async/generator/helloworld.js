function* helloworld () {
    console.log('step 1')
    yield 1
    console.log('step 2')
    yield 2
    console.log('step 3')
    return 3
}

var gen = helloworld();

var ret = gen.next() // 输出: 'step 1'
console.log(ret.value) // 1
console.log(ret.done) // false

ret = gen.next() // 输出 'step 2'
console.log(ret.value) // 2
console.log(ret.done) // false

ret = gen.next() // 输出 'step 3'
console.log(ret.value) // 3
console.log(ret.done) // true

console.log('----------------------')
ret = gen.next() // 无输出
console.log(ret.value) // undefined
console.log(ret.done) // true
