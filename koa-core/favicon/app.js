const Koa = require('koa');
const favicon = require('koa-favicon');
const app = new Koa();

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use((ctx, next)=>{
  ctx.body = '<h1>hello favicon</h1>'
})

app.listen(3002);