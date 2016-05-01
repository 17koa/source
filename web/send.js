var send = require('koa-send');
var Koa = require('koa');
var app = new Koa();

// $ GET /package.json
// $ GET /

app.use(function (ctx, next){
  // if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
  return send(ctx, ctx.path);
})

app.listen(3000);
console.log('listening on port 3000');