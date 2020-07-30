---
sidebar: auto
---

# 函数

## 函数对象

JavaScript 中的函数就是对象，函数对象连接到 `Function.prototype`(该原型对象连接到 `Object.prototype`)，每个函数创建时都会附加 2 个隐藏属性：

1. 函数的上下文
2. 实现函数行为的代码

每个函数对象在创建时也随配有一个 `prototype` 属性。它的值是一个拥有 **constructor** 属性且值即为该函数的对象。这和隐藏连接到 `Function.prototype` 完全不同。

```javascript
function Foo() {
    this.x = 1;
}

const foo = new Foo(); // Foo函数以构造器调用模式调用
foo.prototype.constructor === Foo;
```

函数在 JavaScript 中为一等公民（可作为变量、参数、函数的返回值、可拥有方法）。

## 函数字面量

函数对象通过函数字面量来创建有 2 种形式

1. 使用 **function** 关键字
2. 箭头函数(ES2015)新增

```javascript
// function关键字
const f0 = function () {};
function f1() {}
// 箭头函数
const f2 = () => {};
```

**function**关键字函数字面量包括 4 个部分：

1. **function**关键字
2. 函数名(可选)，可用作递归调用自己
3. 函数的形参(可选)，一组参数名使用`,`分隔
4. 函数体

**箭头函数**字面量包括 2 个部分:

1. 函数的形参(可选), 一组参数名使用`,`分隔，当只有一个形参时可以省略括号
2. 函数体

## 调用模式

调用一个函数会对当前暂停当前执行块，传递控制权与参数给该函数，并将函数压入执行栈中，除了声明的形参以外，还会传递 2 个附加的参数：`this`、`arguments`。`this` 值取决于它的调用模式。

调用运算符是跟在任何产生一个表达式之后的一对`()`。圆括号内包含 0 个或多个用逗号分隔的表达式，函数在调用时会将每个表达式的值传递给函数的形参，当实参与形参个数不匹配时也不会报错，形参>实参时则多余的形参会被赋值为 undefined，当实参>形参时则多余的实参会忽略，但在`arguments`中可以获取到多余的实参。

### 方法调用模式

当函数在对象中被调用是我们认为这是一个方法，当一个方法调用时，它的`this`值被绑定为当前对象

### 函数调用模式

当函数并非一个对象的属性时，称之为函数调用模式，该模式下`this`值被绑定为全局对象，即使函数内部声明的函数的`this`值也会绑定到全局对象，当内部函数希望访问父函数的this值时只能以变量的方式保存下来供子函数使用。

> 《JavaScript语言精粹》中提到这是一个语言设计错误，倘若语言设计正确则`this`值应该绑定到外部函数的`this`变量。这个设计错误的后果就是方法不能调用利用内部函数来帮助它工作。

```javascript
function a() {
    console.log("a -> this", this)
    function b() {
        console.log("b -> this", this)
    }
    b() // b -> this Window
}
a() // b -> this Window
```

### 构造函数调用模式

> JavaScript 是一种基于原型继承的语言，这意味着对象可以直接从其他对象继承属性，该语言是无类型的

如果一个函数前面加上new关键字来调用，称之为构造函数。它会返回一个新的对象，并且`this`值被绑定到新对象上。该对象的`prototype`会指向该函数的`prototype`，`prototype.constructor`属性指向该构造函数

> 因为函数的多种调用模式不确定性，如果函数希望是以构造函数的调用模式来使用，则使用大驼峰命名进行约定

```javascript
function Car(name, engine) { 
    this.name = name;
    this.engine = engine;
}
Car.prototype.engine = '柴油发动机'

const car = new Car('兰博基尼', 'V8')

// car.prototype -> {constructor: Car, engine: '柴油发动机'}
// car.prototype === Car.prototype
```


### apply、call、bind 调用模式

在 `Function.prototype` 上存在 `apply`、`call`、`bind` 3个方法，他们的调用模式比较特殊，主要用来改变`this`值绑定。

`apply` 方法接受2个参数，第一个参数为执行时的`this`值绑定，第二个参数为实参数组，他会将实参数组每一项按照顺序传递给调用函数的形参上。

`call` 方法接受n个参数，第一个参数与`apply`一样为`this`值绑定，n+1 ~ n的实参会也会按照顺序传递给调用函数的形参上。

`bind`与`apply`,`call`有所不同，`bind`方法只接受1个参数，就是`this`的绑定值，但执行`bind`方法并不会直接调用函数的执行，只会更改函数以后执行时的绑定的`this`值

## arguments

函数在执行时会在其内部隐式包含一个变量arguments，该变量记录了当前调用函数的实参列表，他是一个类数组(类似数组但不是数组)，没有数组的一些函数，只包含下标值与length。

**ES2015中箭头函数没有arguments**

利用arguments可以完成一些可伸缩参数的效果

```javascript
function sum() {
    return Array.from(arguments).reduce((prev,current)=>prev+current)
}

sum(1,2,3,4,5,6,7,8,9) // 45
```

## 函数的返回

函数在执行时从第一条语句开始逐行开始执行，并在遇到函数体对应的"}"时结束，然后将函数推出执行栈，引擎将继续执行栈内代码。

`return`语句可以让函数提前结束，并往外部抛出一个返回值，这个返回值跟在`return`后面，例如:`return xxx`，返回值是可选的，在return后面没有跟上返回值的情况则默认返回`undefined`，返回值必须与return在同行内，否则将造成`return undefined`在JavaScript中函数只能有一个返回值，某些语言可以拥有多个返回值例如 GOLang。

```javascript{7}
function sum(x, y) {
    return x + y;
}
sum(1, 2) // 3

function sum2(x, y) {
    return // 执行到这时函数直接中断并返回undefined值
    x + y;
}
sum2(1, 2) // undefined
```

我们应该尽量避免`finally`中使用`return`值，因为`try`、`catch`、`finally`代码块在执行时`finally`的`return`值会覆盖掉`try`、`catch`中的返回值，导致返回与预期不符的返回值

```javascript
function getName(person) {
    try {
        return person.name;
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        return '';
    }
}

var name1 = getName() // 没传递参数，导致读取属性报错，理应throw一个error,返回值应该为undefined
console.log(name1) // ''

var name2 = getName({}) // 传递了一个对象，但没有name属性，理应return一个undefined
console.log(name2) // ''

var name3 = getName({name: '张三'}) // 传递了一个对象，有name属性，理应return 它的name属性
console.log(name3) // ''
```

为什么上述例子中返回的值都是空字符串呢？因为刚刚说的`finally`中的`return`会覆盖掉`try`、`catch`中的返回值。

