const Koa = require('koa');
const app = new Koa();

var co = require('co')

// m1
app.use((ctx, next) => {
  console.log('第1个中间件before 1')
  return next().then(() => {
    // after
    console.log('第1个中间件after 2')
  })
});

// response
app.use(ctx => {
  console.log('业务逻辑处理')
  return ctx.body = {
    data: {},
    status: {
      code  : 0,
      msg   :'sucess'
    }
  }
});

app.listen(3000);