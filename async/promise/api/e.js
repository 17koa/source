// new Promise(function(resolve){
//     resolve(1);
// }).then(function(value){
//     console.log('new Promise ' + value);
// });

//
// Promise.resolve(1).then(function(value){
//     console.log('Promise.resolve 2 ' + value);
// });


// 奇数和偶数
function hello(i){
  if (i % 2 == 0) {
    return Promise.resolve(i)
  } else {
    return Promise.reject(i)
  }
}

hello(1).then(function(value){
    console.log('Promise.reject 1 ' + value);
});

hello(2).then(function(value){
    console.log('Promise.resolve 1 ' + value);
});
