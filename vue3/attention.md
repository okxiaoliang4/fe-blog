1. 当一个 ref 值嵌套于响应式对象之中时，访问时会自动解开
2. 生命周期注册方法只能用在 setup 钩子中。它会通过内部的全局状态自动找到调用此 setup 钩子的实例。有意如此设计是为了减少将逻辑提取到外部函数时的冲突。
3. setup 在 beforeCreated 前触发
4. reactive api 使用组合函数时必须始终保持对这个所返回对象的引用以保持响应性。这个对象不能被解构或展开 （除非使用 toRefs api）
5. 不能解构 props 否则会失去响应性
6. 如果传入 ref 的是一个对象，将调用 reactive 方法进行深层响应转换

7. 注意如果将一个新的 ref 分配给现有的 ref， 将替换旧的 ref：

```javascript
const otherCount = ref(2);

state.count = otherCount;
console.log(state.count); // 2
console.log(count.value); // 1
```

7. 注意当嵌套在 reactive Object 中时，ref 才会解套。从 Array 或者 Map 等原生集合类中访问 ref 时，不会自动解套：

```javascript
const arr = reactive([ref(0)]);
// 这里需要 .value
console.log(arr[0].value);

const map = reactive(new Map([['foo', ref(0)]]));
// 这里需要 .value
console.log(map.get('foo').value);
```

8. watchEffect [docs](https://composition-api.vuejs.org/zh/api.html#watcheffect)
    1. 内部依赖值更改后，会在组件重新渲染过后触发（可通过 flush 属性调整触发时机）
    2. onTrack 和 onTrigger 仅在开发模式下生效。
    3. 对内部依赖 ref.value 读取过的才会触发

### 生命周期钩子函数

-   与 2.x 版本生命周期相对应的组合式 API

    -   beforeCreate -> 使用 setup()
    -   created -> 使用 setup()
    -   beforeMount -> onBeforeMount
    -   mounted -> onMounted
    -   beforeUpdate -> onBeforeUpdate
    -   updated -> onUpdated
    -   beforeDestroy -> onBeforeUnmount
    -   destroyed -> onUnmounted
    -   errorCaptured -> onErrorCaptured

-   新增钩子函数：
-   -   onRenderTracked
    -   onRenderTriggered

#### provide/inject [docs](https://composition-api.vuejs.org/zh/api.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)

provide 和 inject 提供依赖注入，功能类似 2.x 的 provide/inject。两者都只能在当前活动组件实例的 setup() 中调用。

可注入响应值（ref、reactive）
