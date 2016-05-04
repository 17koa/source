var fs = require('fs')
var ejs = require('ejs')

// 读取模板文件，放到user_tpl_str变量中
var user_tpl_str = fs.readFileSync('./list.ejs').toString();

console.log(user_tpl_str)

// 通过ejs的render方法，对user_tpl_str和数据进行编译
var html = ejs.render(user_tpl_str, {
  users:[
    {
      name: '朴灵'
    }, {
      name: 'alsotang'
    },{
      name: 'i5ting'
    }
  ]
});

console.log(html)
