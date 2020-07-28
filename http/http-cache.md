---
sidebar: auto
---

# HTTP 缓存

HTTP 缓存有 2 中缓存模式：

1. 强缓存
2. 协商缓存

## 强缓存

强缓存由属性 Expries、Cache-Control、Pragma，3 个 Header 属性进行控制

### Expries

Expries 响应头包含日期/时间， 即在此时候之后，响应过期。

无效的日期，比如 0, 代表着过去的日期，即该资源已经过期。

如果在 Cache-Control 响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 Expires 头会被忽略。

#### 语法

> Expires: \<http-date>

#### 示例

> Expires: Wed, 21 Oct 2015 07:28:00 GMT

### Cache-Control

Cache-Control 是 HTTP1.1 新增的属性，通用消息头字段，被用于在 http 请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。

请求头可选值：

1. Cache-Control: max-age=\<seconds>
2. Cache-Control: max-stale[=\<seconds>]
3. Cache-Control: min-fresh=\<seconds>
4. Cache-control: no-cache
5. Cache-control: no-store
6. Cache-control: no-transform
7. Cache-control: only-if-cached

响应头可选值：

1. Cache-control: must-revalidate
2. Cache-control: no-cache
3. Cache-control: no-store
4. Cache-control: no-transform
5. Cache-control: public
6. Cache-control: private
7. Cache-control: proxy-revalidate
8. Cache-Control: max-age=\<seconds>
9. Cache-control: s-maxage=\<seconds>

#### no-cache

> 指定 no-cache 或 max-age=0 表示客户端可以缓存资源，每次使用缓存资源前都必须重新验证其有效性。这意味着每次都会发起 HTTP 请求，但当缓存内容仍有效时可以跳过 HTTP 响应体的下载。

# 参考资料

[MDN(Expires)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires)

[MDN(Cache-Control)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
