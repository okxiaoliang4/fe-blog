---
sidebar: "auto"
---

# 变量声明

var 关键字用于声明变量，语法为

> var \<varible-name> ([= \<value>])?

## 作用域

var 的作用域为函数级作用域。

我们声明 2 个变量 a、b

```javascript
var a = 1; // window.a = 1
b = 2; // window.b = 2
```

上面这 2 行代码分别创建了 2 个变量，**a** 与 **b**，在全局代码块中运行该代码会将变量声明到**全局对象**中,后问中 **window** 代表全局对象

> 全局对象：浏览器宿主环境下 window 为全局对象，nodejs 宿主环境下 global 为全局对象

```javascript
function test() {
  var a = 1; // [[FUNCTION EXECUTE ENVIRONMENT]].a = 1
  b = 2; // window.b = 2
  console.log(a); // 1
  console.log(b); // 2
}
test();
console.log(a); // error
console.log(b); // 2
```

在函数中使用 var 定义 **a** 变量会将该变量定义只存在与当前函数运行环境中，在函数执行完毕后释放该变量。

变量 **b** 会穿透函数代码块声明到 **window** 上，这不符合人的直觉，并且会导致全局作用域混乱，例如：与第三方库变量名冲突等危害。

我们来看看下面这段代码会输出什么值？

```javascript
for (var i = 0; i < 100; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```

这段代码很容易让人误以为是从 0 输出到 99，实则不是，而是输出了“100” 100 次，为什么会这样呢，这里我们要先了解一下 Javascript 的事件循环
