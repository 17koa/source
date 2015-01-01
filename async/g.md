# Generator


Generator Function（生成器函数）和Generator（生成器）是ES6引入的新特性，该特性早就出现在了Python、C#等其他语言中。

生成器本质上是一种特殊的[迭代器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/The_Iterator_protocol)。

Generator函数本意是iterator生成器，函数运行到yield时退出，并保留上下文，在下次进入时可以继续运行，关于Generator可以看这篇 https://hacks.mozilla.org/2015/05/es6-in-depth-generators/ ,现在这个特性作为协程使用将异部流程改造成同步

ES6里的迭代器并不是一种新的语法或者是新的内置对象(构造函数)，而是一种协议 (protocol)。所有遵循了这个协议的对象都可以称之为迭代器对象。——摘自MDN 根据迭代器协议可以很容易写出产生100以内自然数的迭代器

```
function createNaturalNumber() {
    var i = 0;
    return {
        next: function next() {
            return {done: i >= 100, value: i++};
        }
    };
}
```

这种迭代器，每次迭代的值都跟上一次的值有关系，此时就需要使用闭包来维护内部状态。

文章开头是一个产生100以内自然数的生成器函数，可以看到相比普通函数减少了内部状态的维护，迭代也十分简单，可通过以下方式迭代
 
for(var i of generateNaturalNumber()) {
    console.log(i);
}


- generator
- next
- yield


## generator入门

生成器函数也是一种函数，语法上仅比普通function多了个星号* ，即function* ，在其函数体内部可以使用yield和yield* 关键字。

简单理解，这是ES6的新feature，function 后面带 * 的叫做generator。

```
function* myFirstGenerator() {
  ....
}
```

到目前为止一切都还不错，和标准函数很像。

和标准函数不一样的是，当你调用gen­er­a­tor函数的时候，本来可以执行的代码一行是不够的。比如

first.js

```
function* myFirstGenerator() {
  console.log('Hi!');
}

myFirstGenerator(); // This will not print anything
````

奇怪吧？如果你理解了它的原理，其实也很简单。

> 当你调用gen­er­a­tor函数的时候，它所做的是返回一个gen­er­a­tor对象。这个gen­er­a­tor对象处于准备开始执行函数体的状态，在第一次调用该gen­er­a­tor对象自己身的next()方法的时候再去执行。
 

改进一下上面的例子，但这次我们会通过调用gen­er­a­tor对象上的next()方法，让它打印出‘Hi’

first2.js

```
function* myFirstGenerator() {
  console.log('Hi!'); // (A)
}

var gen = myFirstGenerator(); // Save a reference to the generator object
gen.next(); // This executes line (A)
```

有点意思了吧？有趣是不够的，我们得让它变得有用。我们会循序渐进的解答所有疑惑的。

## next

内置迭代器

String，Array，TypedArray，Map和Set都是内置迭代器，因为它们的原型中都有一个Symbol.iterator方法。

## 结合yield：交错执行顺序利器

Using gen­er­a­tors with yield: An inter­leaved（交错，交织） exe­cu­tion order

Per­haps the only way to derive mean­ing­ful use of from gen­er­a­tor func­tions is when they are used in con­junc­tion with the yield key­word. The yield key­word, which was also intro­duced in ES6 allows you to pause exe­cu­tion of a func­tion and option­ally emit a value and/or receive a value in its place.

yield关键词，它允许你暂停函数执行，并可选的给出结果或在它所在的位置接收值。


简而言之，你可以把yield想象成是占位符，位于暂停函数执行所在行的占位符。

```
function* doSomething() {
    yield; // This just pauses execution but does not emit anything
}
```

上面的这个函数可以这样调用：

```
// Create a generator object as usual
var gen1 = doSomething();

// As we saw earlier,
// function execution begins on the first invocation
// of next() but since this function has a yield,
// execution pauses the moment the keyword 'yield' is encountered
console.log(gen1.next());

// A second invocation attempts to resume execution of the
// function until it is complete or another yield is encountered
console.log(gen1.next());

```

让我们来看一下下面这个例子，这次主要是在代码前后增加了console.logs

```
function* doSomething() {
    console.log('1');
    yield; // Line (A)
    console.log('2');
}

var gen1 = doSomething();

gen1.next(); // Prints 1 then pauses at line (A)
gen1.next(); // resumes execution at line (A), then prints 2
```

说明

- gen1是产生出来的generator对象
- 第一个next，会打印出1，之后悬停在 yield所在行，即Line (A)
- 第二个next，恢复line (A)点的执行，之后打印出2

目前，我知道上面的这2个例子都没有真正的展示出我们之前说过的“占位符”的概念。因此，下面的例子里，我们会对上面的代码稍作修改，以便于阐述yield作为占位符的具体用法。

first5.js  

```
function* doSomething() {
    var v = yield; // Pause execution, wait for the next() invocation.
    console.log(v);
}

var gen1 = doSomething();

// 在yield处，让generator悬停
gen1.next();

// 这会回复执行，并替换 'yield' 占位符
// 参数'Hola'会被传到占位符里
gen1.next('Hola');
```

Per­haps the most inter­est­ing aspect of the above exam­ple is the usage of next() to pass val­ues into a func­tion, right in the mid­dle of its exe­cu­tion flow. And this is only pos­si­ble because yield pauses func­tion exe­cu­tion until the next next() !

最有意思的事儿就是在next()函数里传值给某个函数，在它的执行流程里用对。

可以翻译为

```
// 定义
function* doSomething() {
    var v = yield; // Pause execution, wait for the next() invocation.
    console.log(v);
}
// 第一步
var gen1 = doSomething();

// 第二步：在yield处，让generator悬停
gen1.next();

// 实际上此时已经generator已经转出函数
function doSomething(name) {
    var v = name; // Pause execution, wait for the next() invocation.
    console.log(v);
}

// 第三步：执行 gen1.next('Hola');等于下面这句
doSomething('Hola') 
```

参数name实际上不存它，它是通过yield占位，然后在next(name)传值进去的。

## 使用多个yield

在一个函数里是可以包含多个yield的，对于理解完整的generator概念是非常有帮助的。下面的例子展示的就是交替打印出hello world，一次一个yield。

```
function* printTwoThings() {
  var val = yield;
  console.log(val);

  val = yield;
  console.log(val);
}

var gen = printTwoThings();

gen.next(); // Start the function execution
gen.next('hello'); // First yield
gen.next('world'); // Second yield
```

说明

- 1）生成对象gen
- 2）第一个next悬停，准备开始执行
- 3）填充第一个yield，并打印hello
- 4）填充第二个yield，并打印world


## 总结

所谓“生成器”，其实是一个函数，但是这个函数的行为会比较特殊：

- 它并不直接执行逻辑，而是用来生成另一个对象（这也正是“生成器”的含义）
- Blocking on asynchronous function calls，它所生成的对象中的函数可以把逻辑拆开来，一片一片调用执行，而不是像普通的函数，只能从头到尾一次执行完毕
- Implementing iterables

生成器的语法和普通函数类似，特殊之处在于：

- 字面量（函数声明/函数表达式）的关键字function后面多了一个*，而且这个*前后允许有空白字符，普通函数用 function 声明。生成器函数则用 function *。
- 函数体中多了yield运算符，在生成器函数内部，关键词 yield 是一种类似 return 的语法。区别就在于函数（甚至生成器函数）只能返回一次，但是生成器函数可以 yield 多次。yield 表达式将生成器的执行过程挂起，随后可以被恢复。


定义

- An iterator is an object with a next method that returns { done, value } tuples.
- An iterable is an object which has an internal method, written in the current ES6 draft specs as obj[@@iterator](), that returns an iterator.
- A generator is a specific type of iterator whose next results are determined by the behavior of its corresponding generator function. Generators also have a throw method, and their next method takes a parameter.
- A generator function is a special type of function that acts as a constructor for generators. Generator function bodies can use the contextual keyword yield, and you can send values or exceptions into the body, at the points where yield appears, via the constructed generator’s next and throw methods. Generator functions are written with function* syntax.
- A generator comprehension is a shorthand expression for creating generators, e.g. (for (x of a) for (y of b) x * y).
 
https://blog.domenic.me/es6-iterators-generators-and-iterables/


# ECMAScript 6 迭代器协议（Iteration protocols）



