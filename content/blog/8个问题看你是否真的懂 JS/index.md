---
title: 8个问题看你是否真的懂 JS
date: "2019-07-22T22:40:32.169Z"
description: JavaScript 是一种有趣的语言，我们都喜欢它，因为它的性质。浏览器是JavaScript的主要运行的地方，两者在我们的服务中协同工作。JS有一些概念，人们往往会对它掉以轻心，有时可能会忽略不计。原型、闭包和事件循环等概念仍然是大多数JS开发人员绕道而行的晦涩领域之一。正如我们所知，无知是一件危险的事情，它可能会导致错误。
---

JavaScript 是一种有趣的语言，我们都喜欢它，因为它的性质。浏览器是JavaScript的主要运行的地方，两者在我们的服务中协同工作。JS有一些概念，人们往往会对它掉以轻心，有时可能会忽略不计。原型、闭包和事件循环等概念仍然是大多数JS开发人员绕道而行的晦涩领域之一。正如我们所知，无知是一件危险的事情，它可能会导致错误。

接下来，来看看几个问题，你也可以试试想想，然后作答。

### 问题1：浏览器控制台上会打印什么？
```js
    var a = 10;
    function foo() {
        console.log(a); // ??
        var a = 20;
    }
    foo();
```
### 问题2:如果我们使用 let 或 const 代替 var，输出是否相同
```js
    var a = 10;
    function foo() {
        console.log(a); // ??
        let a = 20;
    }
    foo();    
```
### 问题3：“newArray”中有哪些元素？
```js
    var array = [];
    for(var i = 0; i &lt;3; i++) {
     array.push(() =&gt; i);
    }
    var newArray = array.map(el =&gt; el());
    console.log(newArray); // ??   
```
### 问题4：如果我们在浏览器控制台中运行'foo'函数，是否会导致堆栈溢出错误？
```js    
    function foo() {
      setTimeout(foo, 0); // 是否存在堆栈溢出错误?
    };    
```
### 问题5: 如果在控制台中运行以下函数，页面(选项卡)的 UI 是否仍然响应
```js
    function foo() {
      return Promise.resolve().then(foo);
    };    
```
### 问题6: 我们能否以某种方式为下面的语句使用展开运算而不导致类型错误
```js
    var obj = { x: 1, y: 2, z: 3 };
    [...obj]; // TypeError 
```
### 问题7：运行以下代码片段时，控制台上会打印什么？
```js
    var obj = { a: 1, b: 2 };
    Object.setPrototypeOf(obj, {c: 3});
    Object.defineProperty(obj, 'd', { value: 4, enumerable: false });

    // what properties will be printed when we run the for-in loop?
    for(let prop in obj) {
        console.log(prop);
    }  
```

### 问题8：xGetter() 会打印什么值？
```js
    var x = 10;
    var foo = {
      x: 90,
      getX: function() {
        return this.x;
      }
    };
    foo.getX(); // prints 90
    var xGetter = foo.getX;
    xGetter(); // prints ??
```

## 答案

现在，让我们从头到尾回答每个问题。我将给您一个简短的解释，同时试图揭开这些行为的神秘面纱，并提供一些参考资料。

### 问题1： `undefined`

#### 解析：

使用`var`关键字声明的变量在JavaScript中会被提升，并在内存中分配值`undefined`。 但初始化恰发生在你给变量赋值的地方。 另外，`var`声明的变量是[函数作用域的](https://link.juejin.im?target=https%3A%2F%2F2ality.com%2F2011%2F02%2Fjavascript-variable-scoping-and-its.html)，而`let`和`const`是块作用域的。 所以，这就是这个过程的样子：
```js
var a = 10; // 全局使用域
function foo() {
// var a 的声明将被提升到到函数的顶部。
// 比如:var a

console.log(a); // 打印 undefined

// 实际初始化值20只发生在这里
    var a = 20; // local scope
}
```

* * *

### 问题 2：`ReferenceError：a undefined`。

#### 解析：

`let`和`const`声明可以让变量在其作用域上受限于它所使用的块、语句或表达式。与`var`不同的是，这些变量没有被提升，并且有一个所谓的**暂时死区(TDZ)**。试图访问**TDZ**中的这些变量将引发`ReferenceError`，因为只有在执行到达声明时才能访问它们。
```js
var a = 10; // 全局使用域
function foo() { // TDZ 开始

// 创建了未初始化的'a'
    console.log(a); // ReferenceError

// TDZ结束，'a'仅在此处初始化，值为20
    let a = 20;
}
```
下表概述了与JavaScript中使用的不同关键字声明的变量对应的提升行为和使用域： 
![https://api.vips.im/juejin/2019/7/16/16bf818411c576e9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1](https://api.vips.im/juejin/2019/7/16/16bf818411c576e9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 问题 3: `[3, 3, 3]`

#### 解析：

在`for`循环的头部声明带有`var`关键字的变量会为该变量创建单个绑定（存储空间）。 阅读更多关于[闭包](https://link.juejin.im?target=http%3A%2F%2Fdmitrysoshnikov.com%2Fecmascript%2Fchapter-6-closures%2F)的信息。 让我们再看一次for循环。
```js
// 误解作用域:认为存在块级作用域
var array = [];
for (var i = 0; i &lt; 3; i++) {
    // 三个箭头函数体中的每个`'i'`都指向相同的绑定，
    // 这就是为什么它们在循环结束时返回相同的值'3'。
    array.push(() =&gt; i);
}
var newArray = array.map(el =&gt; el());
console.log(newArray); // [3, 3, 3]
```
如果使用 `let` 声明一个具有块级作用域的变量，则为每个循环迭代创建一个新的绑定。

```js
// 使用ES6块级作用域
var array = [];
for (let i = 0; i &lt; 3; i++) {
    // 这一次，每个'i'指的是一个新的的绑定，并保留当前的值。
    // 因此，每个箭头函数返回一个不同的值。
    array.push(() =&gt; i);
}
var newArray = array.map(el =&gt; el());
console.log(newArray); // [0, 1, 2]
```

解决这个问题的另一种方法是使用[闭包](https://link.juejin.im?target=http%3A%2F%2Fdmitrysoshnikov.com%2Fecmascript%2Fchapter-6-closures%2F)。
```js
let array = [];
for (var i = 0; i &lt; 3; i++) {

    array[i] = (function(x) {
    return function() {
        return x;
    };
    })(i);
}
const newArray = array.map(el =&gt; el());
console.log(newArray); // [0, 1, 2]  
```


### 问题4 : 不会溢出

#### 解析：

JavaScript并发模型基于“事件循环”。 当我们说“浏览器是 JS 的家”时我真正的意思是浏览器提供运行时环境来执行我们的JS代码。

浏览器的主要组件包括**调用堆栈**，**事件循环****，任务队列**和**Web API**。 像`setTimeout`，`setInterval`和`Promise`这样的全局函数不是JavaScript的一部分，而是 Web API 的一部分。 JavaScript 环境的可视化形式如下所示：

![https://api.vips.im/juejin/2019/7/16/16bf818729833534?imageView2/0/w/1280/h/960/format/webp/ignore-error/1](https://api.vips.im/juejin/2019/7/16/16bf818729833534?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

JS调用栈是后进先出(LIFO)的。引擎每次从堆栈中取出一个函数，然后从上到下依次运行代码。每当它遇到一些异步代码，如`setTimeout`，它就把它交给`Web API`(箭头1)。因此，每当事件被触发时，`callback` 都会被发送到任务队列（箭头2）。

**事件循环(Event loop)<strong>不断地监视任务队列(Task Queue)，并按它们排队的顺序一次处理一个回调。每当**调用堆栈(call stack)**为空时，<strong>Event loop**获取回调并将其放入</strong>堆栈(stack )</strong>(箭头3)中进行处理。请记住，如果调用堆栈不是空的，**则事件循环不会将任何回调推入堆栈**。

现在，有了这些知识，让我们来回答前面提到的问题：

## 步骤

1.  调用 `foo()`会将`foo`函数放入**调用堆栈(call stack)**。
2.  在处理内部代码时，JS引擎遇到`setTimeout`。
3.  然后将`foo`回调函数传递给**WebAPIs**(箭头1)并从函数返回，调用堆栈再次为空
4.  计时器被设置为0，因此`foo`将被发送到**任务队列**(箭头2)。
5.  由于调用堆栈是空的，事件循环将选择`foo`回调并将其推入调用堆栈进行处理。
6.  进程再次重复，堆栈不会溢出。

运行示意图如下所示：

![](https://api.vips.im/juejin/2019/7/16/16bf81900b5a9abf?imageslim)

* * *

#### 问题5 : 不会响应

#### 解析：

大多数时候，开发人员假设在**事件循环<strong>图中只有一个任务队列。但事实并非如此，我们可以有多个任务队列。由浏览器选择其中的一个队列并在该队列中**处理回调</strong>。

在底层来看，JavaScript中有宏任务和微任务。`setTimeout`回调是**宏任务**，而`Promise`回调是**微任务**。

主要的区别在于他们的执行方式。宏任务在单个循环周期中一次一个地推入堆栈，但是微任务队列总是在执行后返回到事件循环之前清空。因此，如果你以处理条目的速度向这个队列添加条目，那么你就永远在处理微任务。只有当微任务队列为空时，事件循环才会重新渲染页面、

现在，当你在控制台中运行以下代码段

```js
function foo() {
    return Promise.resolve().then(foo);
};
```

每次调用'`foo`'都会继续在微任务队列上添加另一个'`foo`'回调，因此事件循环无法继续处理其他事件（滚动，单击等），直到该队列完全清空为止。 因此，它会阻止渲染。

* * *

#### 问题6 : 会导致TypeError错误

#### 解析：

[展开语法](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2FSpread_syntax) 和 [for-of](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffor...of) 语句遍历`iterable`对象定义要遍历的数据。`Array` 或`Map` 是具有默认迭代行为的内置迭代器。对象不是可迭代的，但是可以通过使用[iterable](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols%23The_iterable_protocol)和[iterator](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols%23The_iterator_protocol)协议使它们可迭代。

在**Mozilla**文档中，如果一个对象实现了`@@iterator`方法，那么它就是可迭代的，这意味着这个对象(或者它原型链上的一个对象)必须有一个带有`@@iterator`键的属性，这个键可以通过常量`Symbol.iterator`获得。

上述语句可能看起来有点冗长，但是下面的示例将更有意义：
```js
var obj = { x: 1, y: 2, z: 3 };
obj[Symbol.iterator] = function() {

    // iterator 是一个具有 next 方法的对象，
    // 它的返回至少有一个对象
    // 两个属性：value＆done。

    // 返回一个 iterator 对象
    return {
    next: function() {
        if (this._countDown === 3) {
        const lastValue = this._countDown;
        return { value: this._countDown, done: true };
        }
        this._countDown = this._countDown + 1;
        return { value: this._countDown, done: false };
    },
    _countDown: 0
    };
};
[...obj]; // 打印 [1, 2, 3]
```

还可以使用 [generator](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffunction*) 函数来定制对象的迭代行为：
```js
var obj = {x:1, y:2, z: 3}
obj[Symbol.iterator] = function*() {
    yield 1;
    yield 2;
    yield 3;
}
[...obj]; // 打印 [1, 2, 3]
```

* * *

#### 问题7 : a, b, c

#### 解析：

`for-in`循环遍历对象本身的[可枚举属性](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FEnumerability_and_ownership_of_properties)以及对象从其原型继承的属性。 可枚举属性是可以在`for-in`循环期间包含和访问的属性。

```js
var obj = { a: 1, b: 2 };
var descriptor = Object.getOwnPropertyDescriptor(obj, "a");
console.log(descriptor.enumerable); // true
console.log(descriptor);
// { value: 1, writable: true, enumerable: true, configurable: true }
```

现在你已经掌握了这些知识，应该很容易理解为什么我们的代码要打印这些特定的属性

```js
var obj = { a: 1, b: 2 }; //a，b 都是 enumerables 属性

// 将{c：3}设置为'obj'的原型，并且我们知道
// for-in 循环也迭代 obj 继承的属性
// 从它的原型，'c'也可以被访问。
Object.setPrototypeOf(obj, { c: 3 });

// 我们在'obj'中定义了另外一个属性'd'，但是 
// 将'enumerable'设置为false。 这意味着'd'将被忽略。
Object.defineProperty(obj, "d", { value: 4, enumerable: false });

for (let prop in obj) {
    console.log(prop);
}
// 打印
// a
// b
// c
```

* * *

#### 问题8 : 10

#### 解析：

在全局范围内初始化`x`时，它成为window对象的属性(不是严格的模式)。看看下面的代码:

```js
var x = 10; // global scope
var foo = {
    x: 90,
    getX: function() {
    return this.x;
    }
};
foo.getX(); // prints 90
let xGetter = foo.getX;
xGetter(); // prints 10
```

咱们可以断言：

```js
window.x === 10; // true
```

`this` 始终指向调用方法的对象。因此，在`foo.getx()`的例子中，它指向`foo`对象，返回`90`的值。而在`xGetter()`的情况下，`this`指向 window对象, 返回 **window** 中的`x`的值，即`10`。

要获取 `foo.x`的值，可以通过使用`Function.prototype.bind`将`this`的值绑定到`foo`对象来创建新函数。

```js
let getFooX = foo.getX.bind(foo);
getFooX(); // 90
```

就这样！ 如果你的所有答案都正确，那么干漂亮。 咱们都是通过犯错来学习的。 这一切都是为了了解背后的“原因”。

