const Koa = require('koa');
const app = new Koa();

var co = require('co')


var parse = require('co-body')

// for raw data
// app.use((ctx, next) => {
//   //
//   // if (ctx.is('text/*')) {
//   //
//   //   // console.log(1111)
//   //   co(function* () {
//   //     var body = yield parse.text(ctx.request);
//   //
//   //     return body;
//   //   }).then(next).then(function (value) {
//   //     ctx.text = value;
//   //   }, function (err) {
//   //     console.error(err.stack);
//   //   });
//   // } else {
//   //   // before
//   //
//   // }
// });

// m1
app.use((ctx, next) => {  
  console.log('1')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      
      return next().then(() => {
        
        // after
        console.log('3')
      })
      
    }, 100);
  });
});


// response
app.use(ctx => {
  console.log('业务逻辑处理')
  ctx.body = 'i am body'
});

app.listen(3000);