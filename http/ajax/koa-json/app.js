var serve = require('koa-static');
var Koa = require('koa');
var app = new Koa();

// or use absolute paths
app.use(serve(__dirname + '/public'));

app.use(ctx => {
  if (ctx.path === '/api/json') {
    ctx.body = {
      "content": "ajax_info里的数据"
    }
  } else {
    ctx.body = {
      "error": "请使用 /api/json 作为请求地址"
    }
  }
  
});

app.listen(3000);

console.log('listening on port 3000');