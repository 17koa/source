const co = require('co');
const debug = require('debug')('v1')
const compose = require('koa-compose')

module.exports = {
  middleware :[],
  use: function (fn) {
    this.middleware.push(fn);
    return this;
  },
  callback: function () {
    const fn = compose(this.middleware);
    console.log('callback compose fn = ' + fn)
    
    var ctx = {
      
    }

    fn(ctx).then(function(){

    })
  }
}
