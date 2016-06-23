function co(GenFunc) {
    return function(cb) {
        var gen = GenFunc()
        next()
        function next() {
            if (gen.next) {
                var ret = gen.next()
                if (ret.done) { // 如果结束就执行cb
                    cb && cb()
                } else { // 继续next
                    // ret.value(next)
                  next()
                }
            }
        }
    }
}


function* genFunc () {
    var result = yield
    console.log(result)
}

co(function *(){
  console.log(1)
  var a = yield *genFunc(1)
  console.log(a)
})()
