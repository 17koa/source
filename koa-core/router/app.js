const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = 'Hello Koa 2.x with router';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3002);