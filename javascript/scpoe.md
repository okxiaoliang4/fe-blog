# 作用域

## 全局作用域、函数级作用域

在[ES2015](./es2015)出来之前，javascript只有2种作用域，分别是**全局作用域**与**函数级作用域**。作用域指的是一个变量环境，代码的位置决定了作用域的范围，例如：

```javascript
var a = 1;
function foo() {
    var b = 2
    console.log(a)
    console.log(b)
}
console.log(a)
foo()
console.log(b)
```

这块代码在编译阶段会生成1个全局作用域，并且在foo执行时会创建foo函数作用域

```
global scope {
    this
    var a
    function foo
}

foo scope {
    outer: global scope
    this
    var b
}
```

产生的`global scope`没有包含`foo scope`，而`foo scope`中包含了`gloabl scope`，表示`foo scope`可以访问到`global scope`中的变量、函数，而`global scope`无法访问`foo scope`中的变量、函数。

那么我们就可以推导出这段代码的执行结果：
1. 输出1
2. 输出1
3. 输出2
4. ReferenceError: b is not defined

## 块级作用域

块级作用域在[ES2015](./es2015)正式推出，新增2个关键字`let`、`const`由此javascript才正式拥有了块级作用域。

块级作用域是如何产生的呢，他有什么作用呢

```javascript
with() {
    // 作用域
}
try {
    // 作用域
} catch () {
    // 作用域
} finally {
    // 作用域
}
switch(e) {
    // 作用域
}

{
    // 作用域
}
```

只有以上几种情况才可以生成块级作用域，所有其他语句都是无法创建块级作用域的，例如

```javascript {3}
const b = 'b'
const flag = true
if(flag) b = 'b2'  // Uncaught SyntaxError: Identifier 'b' has already been declared
```

```javascript {2}
const b = 'b'
for (let i = 0;i<10;i++)b = i+1  // Uncaught SyntaxError: Identifier 'b' has already been declared
```

为什么javascript拥有了全局作用域与函数级作用域之后又出现了块级作用域呢？它的出现为了解决什么问题呢？

```javascript
function test() {
    for (var i = 0; i < 10; i++) {
        setTimeout(function() { 
            console.log(i)
        }, 0)
    }
}
test()
```

我们看一下这段代码，先头脑风暴一下执行结果会是什么呢？

答案是从0 ~ 9吗？大多数初学者遇到这一题的时候都认为是输出从0~9，但结果是输出了10次10，这是为什么呢？

我们先来拆解一下块代码的作用域构成

```
global scope {
    this
    function test
}

test scope {
    outer: global scope
    this
    var i
}

anonymous scope {
    outer: test scope
    this
}
```

再拆解一下执行流程

@flowstart
start=>start: 开始|past
end=>end: 结束|future
initScope=>operation: 初始化作用域,变量提升
forInit=>operation: i = 0
forCond=>condition: i < 10
forExp=>operation: i++
forEnd=>end: 循环结束|future
setTimeout=>subroutine: setTimeout 添加宏任务
macro=>operation: 取出宏任务
log=>inputoutput: console.log(i) * 10

start->initScope->forInit->forCond(yes)->setTimeout->forCond
forCond(no,left)->forEnd->macro->log->end
@flowend


当流程走到宏任务时循环已经结束了，然后执行依次执行`console.log(i)`，**访问变量`i`从当前函数作用域(anonymous scope)中查找,当前函数作用域没有找到该变量时会继续往(outer scope)查找，如果未找到变量则会一直沿着outer往上查找
直到查找到(global scope)才会停止**那么**test scope**中的变量`i`这个时候已经为10，所以输出了10次10

