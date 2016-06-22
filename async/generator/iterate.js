'use strict'
function iterateOver() {
  let index = 0;        
  let iterable = {
    [Symbol.iterator]() {                
      return this;
    },
    next() {                
      if (index < args.length) {                    
        return { value: args[index++] };
      } else {                    
        return { done: true };
      }
    },
  };        
  return iterable;
}

// Using `iterateOver()`:
for (let x of iterateOver('fee', 'fi', 'fo', 'fum')) {
  console.log(x);
}    
// Output:
// fee
// fi
// fo
// fum