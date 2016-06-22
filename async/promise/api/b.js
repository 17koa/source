var error = new Error('this is a error')

new Promise(function(resolve, reject){
    reject(error);
}).catch(function(err){
    console.log('new Promise ' + err);
});

Promise.reject(error).catch(function(err){
    console.log('Promise.resolve ' + err);
});
