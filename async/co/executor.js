// function co(GenFunc) {
//     return function(cb) {
//         var gen = GenFunc()
//         next()
//         function next() {
//             if (gen.next) {
//                 var ret = gen.next()
//                 if (ret.done) { // 如果结束就执行cb
//                     cb && cb()
//                 } else { // 继续next
//                     // ret.value(next)
//                   next()
//                 }
//             }
//         }
//     }
// }

function co(fn) {
  return function(done) {
    var ctx = this;
    var gen = fn.call(ctx);
    var it = null;
    function _next(err, res) {
      it = gen.next(res);
      if (it.done) {
        done.call(ctx, err, it.value);
      } else {
        it.value(_next);
      }
    }
    _next();
  }
}

var fs = require('fs');
function size(file) {
  return function(fn){
    fs.stat(file, function(err, stat){
      if (err) return fn(err);
      fn(null, stat.size);
    });
  }
}
var getIndexSize = size("./index.js");

getIndexSize(function(size){
    console.log(size);
})

function* genFunc () {
    var result = yield
    console.log(result)
}

// co(function *(){
//   console.log(1)
//   var a = yield genFunc()
//   console.log(a)
// })()


co(function *(){
  var a = yield size('.gitignore');
  var b = yield size('package.json');
  console.log(a);
  console.log(b);
  return [a,b];
})(function (err,args){
  console.log("callback===args=======");
  console.log(args);

})
//下面是结果，实际的数据根据你的文件会有不同
/*
12
1215
callback===args=======
[ 12, 1215 ]
*/