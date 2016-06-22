function* doSomething() {
    var v = yield; // Pause execution, wait for the next() invocation.
    console.log(v);
}

var gen1 = doSomething();

// 在yield处，让generator悬停
gen1.next();

// 这会回复执行，并替换 'yield' 占位符
// 参数'Hola'会被传到占位符里
gen1.next('Hola');