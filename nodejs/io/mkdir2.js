var fs = require('fs')
var dir = 'newfolder'

var exists = fs.existsSync(dir);

console.log(exists ? "it's there" : 'no ' + dir + '!');

if (exists === false) {
  fs.rmdirSync(dir)
  console.log('remove it')
}

fs.mkdirSync(dir)

console.log('create new folder sucess')