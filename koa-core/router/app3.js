const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

const index = require('./routes2/index');
const users = require('./routes2/users');

app.use(index.routes());
app.use(users.routes());
 
app.listen(3002);
