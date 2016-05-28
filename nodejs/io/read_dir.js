var fs = require('fs')

fs.readdir('./node_modules', function(err, files) {
		if (err) {
			console.log('read dir error');
		} 
    
    console.log(files)
})