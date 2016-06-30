var router = require('koa-router')();

router.prefix('/')

router.get('/',  (ctx, next) => {
   ctx.body = 'Hello Koa 2.x with routes';
})

module.exports = router;
