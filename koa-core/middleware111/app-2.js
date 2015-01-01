const Koa = require('koa');
const app = new Koa();



// m1
app.use((ctx, next) => {
  console.log('第1个中间件before 1')
  var parse = require('co-body')
  
  return new Promise((resolve, reject) => {
    
    yield parse.text(ctx.request);
    resolve();
    
    return next().then( () => {
      console.log('第1个中间件after 2')
    })
  })
});

// m2
app.use((ctx, next) => {
  console.log('第2个中间件before 3')
  return next().then(() => {
    // after
    console.log('第2个中间件after 4')
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