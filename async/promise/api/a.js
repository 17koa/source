new Promise(function(resolve){
    resolve(1);
}).then(function(value){
    console.log('new Promise ' + value);
});

Promise.resolve(1).then(function(value){
    console.log('Promise.resolve ' + value);
});

