function* hello_generator() {
    console.log('before');
    yield 1;
    console.log('after');
    return 2
}

var h = hello_generator();

console.log(h.next());
console.log(h.next());