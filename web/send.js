var send = require('koa-send');
var Koa = require('koa');
var app = new Koa();

// $ GET /package.json
// $ GET /

app.use(function (ctx, next){
  if ('/' == ctx.path) ctx.path = 'index.html';
  return send(ctx, ctx.path, { root: __dirname + '/starter-template' });
})

app.listen(3000);
console.log('listening on port 3000');