var dirw = require('dirw');

dirw.walk('.', 0, function handleFile(path, floor) {
  console.log(path)
});

// 列出xx目录下的一级目录
dirw.dir('node_modules', function(dir_path, dir_name){
  if(dir_name == 'bin' || dir_name == '.bin'){
    return;
  }

  console.log(dir_path);
  console.log(dir_name);
});
