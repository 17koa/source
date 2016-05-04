var serve = require('koa-static');
var koa = require('koa');
var app = new koa();

app.use(serve('starter-template'));

app.listen(3000);

console.log('listening on port 3000');