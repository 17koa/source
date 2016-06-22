function *foo(x) {
    console.dir(x)
    var y = 2 * (yield (x + 1));
    console.dir(x)
    console.dir(y)
    console.dir(z)
    
    var z = yield (y / 3);
    
    console.dir(x)
    console.dir(y)
    console.dir(z)
    
    return (x + y + z);
}

var it = foo( 5 );

// note: not sending anything into `next()` here
console.log( it.next() );       // { value:6, done:false }
console.log( it.next( 12 ) );   // { value:8, done:false }
// console.log( it.next( 13 ) );   // { value:42, done:true }