var fs = require('fs')

// 读取license
fs.readFile('../LICENSE', function(err, content){
  var license = content.toString();
  console.log(license)
})
