var router = require('koa-router')();

router.get('/',  (ctx, next) => {
   ctx.body = 'Hello Users';
})

module.exports = router;
