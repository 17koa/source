// new Promise(function(resolve){
//     resolve(1);
// }).then(function(value){
//     console.log('new Promise ' + value);
// });

//
// Promise.resolve(1).then(function(value){
//     console.log('Promise.resolve 2 ' + value);
// });


// 以下做法是正确的的
function hello(i){
    return Promise.resolve(i)
}

hello(1).then(function(value){
    console.log('Promise.resolve 1 ' + value);
});
