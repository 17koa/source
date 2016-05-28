var fs = require('fs')

var dest_file_path = 'w.txt'
content = "i am node.js fan"

fs.writeFile(dest_file_path, content , function (err) {
  if (err) throw err;
  console.log('It\'s write sucess!');
  
  fs.readFile(dest_file_path, function(err, content){
    var license = content.toString();
    console.log(license)
  })
});

