const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

const index = require('./routes/index');
const users = require('./routes/users');

router.use('/', index.routes());
router.use('/users', users.routes());

app
  .use(router.routes())
  .use(router.allowedMethods());
 
app.listen(3002);
