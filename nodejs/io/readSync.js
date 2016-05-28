var fs = require('fs')

// 读取license
var license = fs.readFileSync('../LICENSE').toString();

console.log(license)