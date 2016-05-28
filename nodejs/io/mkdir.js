var fs = require('fs')
var dir = 'newfolder'

fs.exists(dir, function (exists) {
  console.log(exists ? "it's there" : 'no ' + dir + '!');
  if (exists === true) {
    fs.rmdir(dir, function (err) {
      if (err) return console.log(err)
      console.log('remove it')
      
      fs.mkdir(dir, function (err) {
        if (err) return console.log(err)
  
        console.log('create new folder sucess')
      })
    })
  }
});
