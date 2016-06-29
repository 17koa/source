const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

const index = require('./routes/index');

router.use('/', index.routes());

app
  .use(router.routes())
  .use(router.allowedMethods());
 
app.listen(3002);
