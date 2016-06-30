var router = require('koa-router')();

router.prefix('/users')

router.get('/',  (ctx, next) => {
   ctx.body = 'Hello Users';
})

module.exports = router;
