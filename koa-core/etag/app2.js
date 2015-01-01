const Koa = require('koa');
const etag = require('koa-etag');
const app = new Koa();

app.use(etag());

app.use((ctx, next)=>{
  console.log('hello etag fresh= ' + ctx.fresh)
  ctx.body = '<h1>hello etag</h1>'
  ctx.etag = 'etaghaha';
  if (ctx.fresh) {
    ctx.status = 304;
    ctx.body = null;
    return;
  }
  
  console.log('do more...')
  
  console.log('hello etag fresh= ' + ctx.fresh)
})

app.listen(3002);