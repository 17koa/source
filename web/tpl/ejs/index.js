var fs = require('fs')
var ejs = require('ejs')

// 读取模板文件，放到user_tpl_str变量中
var user_tpl_str = fs.readFileSync('./user.ejs').toString();

console.log(user_tpl_str)

// 通过ejs的render方法，对user_tpl_str和数据进行编译
var html = ejs.render(user_tpl_str, {
  user:{
    name: 'i5ting'
  }
});

console.log(html)

// 如果user为空，测试编译结果
var empty_html = ejs.render(user_tpl_str, {
  user:undefined
});

console.log(empty_html)