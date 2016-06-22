function* genFunc () {
    var result = yield
    console.log(result)
}
var gen = genFunc()
gen.next() // 此时generator内部执行到 yield 1 并暂停，但还未对result赋值！

// 即使异步也可以！
// setTimeout(function () {
//     gen.next(123) // 给result赋值并继续执行，输出: 123
// }, 1000)

gen.next('323232') // 给result赋值并继续执行，输出: 123
gen.next('3332') // 给result赋值并继续执行，输出: 123